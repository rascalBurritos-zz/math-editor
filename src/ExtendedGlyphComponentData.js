import { GlyphComponentData } from "./GlyphComponentData.js";
import { constructExtendedGlyph } from "./constructExtendedGlyph.js";
import { bestVariant } from "./bestVariant.js";
import { ExtendedGlyph } from "./ExtendedGlyph.js";

//baseUnicode,
// currentFontSize,
//desiredSize,
//direction,
//fontData
//pxpfu
class GlyphConstruction {
    constructor(glyphSpec) {
        this.setDirection(glyphSpec.direction);
        this.determineGlyphsAndOverlap(glyphSpec);
    }
    setDirection(direction) {
        this.direction = direction;
    }

    determineGlyphsAndOverlap(glyphSpec) {
        let fontData = glyphSpec.fontData;
        let baseUnicode = glyphSpec.baseUnicode;
        let currentFontSize = glyphSpec.currentFontSize;
        let desiredSize = glyphSpec.desiredSize;
        let direction = this.direction;
        var minConnectorOverlap = parseInt(
            fontData.MATH.MathVariants.MinConnectorOverlap.value,
            10
        );
        var extendedGlyphMetrics = constructExtendedGlyph(
            baseUnicode,
            desiredSize,
            currentFontSize,
            direction,
            fontData.variants,
            fontData.upm,
            fontData.glyphNameToUnicode,
            minConnectorOverlap
        );
        this.unicodeArray = extendedGlyphMetrics.unicodeArray;
        this.overlapArray = extendedGlyphMetrics.overlapArray;
        this.italicsCorrection = extendedGlyphMetrics.italicsCorrection;
    }
}
export class ExtendedGlyphComponentData {
    constructor(glyphSpec) {
        this.generateData(glyphSpec);
    }

    generateData(glyphSpec) {
        this.component = ExtendedGlyph;
        this.svgConstruction = this.getSVGConstruction(glyphSpec); //each element
        //has path, fu height, fu depth, fu width, transform string
        this.viewBox = this.getViewbox(this.svgConstruction); //set the viewbox of svg
        this.setDimensions(glyphSpec); //set this.height,width,depth,
        // used for formula and such
        this.css = this.getCSS(glyphSpec);
    }

    getSVGConstruction(glyphSpec) {
        var glyphConstruction = new GlyphConstruction(glyphSpec);
        var svgConstruction = new SVGConstruction(
            glyphConstruction,
            glyphSpec.fontData
        );
        return svgConstruction;
    }

    getViewbox(svgConstruction) {
        let dimension = svgConstruction.dimension;
        let baseString = "0, ";
        let ymin = dimension.ymin;
        let totalWidth = dimension.totalWidth;
        let totalHeight = dimension.totalHeight;
        return baseString + ymin + ", " + totalWidth + ", " + totalHeight;
    }

    setDimensions(glyphSpec) {
        let pxpfu = glyphSpec.pxpfu;
        this.height = this.svgConstruction.dimension.height * pxpfu;
        this.depth = this.svgConstruction.dimension.depth * pxpfu;
        this.width = this.svgConstruction.dimension.totalWidth * pxpfu;
    }

    getCSS(glyphSpec) {
        let height =
            this.svgConstruction.dimension.totalHeight * glyphSpec.pxpfu + "px";
        let width =
            this.svgConstruction.dimension.totalWidth * glyphSpec.pxpfu + "px";
        return { height: height, width: width, outline: "1px solid darkred" };
    }
}

class PartialSVGGlyph {
    constructor(unicodeAndFontData) {
        this.unicode = unicodeAndFontData.unicode;
        this.fontData = unicodeAndFontData.fontData;
        this.path = this.getPath();
        this.setFUDimensions();
        this.transform = "";
    }

    getPath() {
        let svgPaths = this.fontData.svgPaths;
        return svgPaths[this.unicode].commands;
    }

    setFUDimensions() {
        let glyphMetric = this.fontData.glyphMetrics[this.unicode];
        this.height = parseInt(glyphMetric.bbox.y2, 10);
        this.depth = -parseInt(glyphMetric.bbox.y1, 10);
        this.width = parseInt(glyphMetric.advanceWidth, 10);
    }
}

class SVGConstruction {
    constructor(glyphConstruction, fontData) {
        this.fontData = fontData;
        this.direction = glyphConstruction.direction;
        this.overlapArray = glyphConstruction.overlapArray;
        this.directionDimension = this.getProperDirectionDimension();
        this.partialSVGGlyphArray = this.generatePartialSVGGlyphArray(
            glyphConstruction
        );
        this.dimension = new SVGConstructionDimension(this);
        this.transform = this.generateTransform();
        this.clipRects = this.generateClipRects();
    }

    generateClipRects(){
        var clipRects = []
        let totalWidth = this.dimension.totalWidth;
        let crossAxisDimension = this.isVertical() ? 'totalWidth' : 'totalHeight'
        let clipRectCrossAxisDimension = this.isVertical() ? 'width' : 'height'
        this.partialSVGGlyphArray.forEach((partialGlyph)=>{
            let clipRect = {};
            clipRect[clipRectCrossAxisDimension] = this.dimension[crossAxisDimension]
            clipRects.push(clipRect)
        })
        let clipRectMainAxisDimension = this.directionDimension;
        for(var i = 1; i<this.offsets.length;i++){
            let mainAxisLength = this.offsets[i] - this.offsets[i-1] +5;
            clipRects[i-1][clipRectMainAxisDimension] = mainAxisLength ;
        }
            clipRects[clipRects.length-1][clipRectMainAxisDimension] = 10000;
        return clipRects;
    }

    generateTransform(){
        let midX = this.dimension.totalWidth/2;
        let midY = this.dimension.totalHeight/2;
        let firstTranslate = `translate(${midX},${midY}) `;
        let scale = 'scale(1,-1) ';
        let secondTranslate = `translate(${-midX},${-midY})`;
        return firstTranslate + scale + secondTranslate;
    }

    isVertical() {
        if (this.direction === "vertical") {
            return true;
        } else if (this.direction === "horizontal") {
            return false;
        } else {
            throw new Error("wrong Extension");
        }
    }
    generatePartialSVGGlyphArray(glyphConstruction) {
        var partialSVGGlyphArray = [];
        glyphConstruction.unicodeArray.forEach(ele => {
            let options = { unicode: ele, fontData: this.fontData };
            partialSVGGlyphArray.push(new PartialSVGGlyph(options));
        });
        this.injectTransforms(partialSVGGlyphArray, this.overlapArray);
        return partialSVGGlyphArray;
    }

    injectTransforms(partialSVGGlyphArray, overlapArray) {
        this.offsets = this.calculateOffsets(
            partialSVGGlyphArray,
            overlapArray
        );
        partialSVGGlyphArray.forEach((partialSVGGlyph, index) => {
            let offset = this.offsets[index];
            partialSVGGlyph.transform = this.getTransformString(offset);
        });
    }
    getTransformString(offset) {
        let prefix = "translate(";
        let suffix = ")";
        let fix = this.isVertical() ? "0, " + offset : offset + ", 0";
        return prefix + fix + suffix;
    }

    getProperDirectionDimension() {
        let directionDimension = this.isVertical() ? "height" : "width";
        return directionDimension;
    }

    calculateOffsets(partialSVGGlyphArray, overlapArray) {
        let currentOffset = 0;
        let offsetArray = [];

        partialSVGGlyphArray.forEach((partialGlyph, index) => {
            offsetArray.push(currentOffset);
            let overlap = overlapArray[index] ? overlapArray[index] : 0;
            currentOffset += partialGlyph[this.directionDimension] - overlap;
        });
        console.log(offsetArray)
        return offsetArray;
    }
}

class SVGConstructionDimension {
    constructor(svgConstruction) {
        this.ymin = this.calculateYMin(svgConstruction.partialSVGGlyphArray);
        this.totalWidth = this.calculateTotalWidth(svgConstruction);
        this.totalHeight = this.calculateTotalHeight(svgConstruction);
        this.setHeightandDepth(svgConstruction);
    }

    setHeightandDepth(svgConstruction) {
        if (svgConstruction.isVertical()) {
            let mathAxis = parseInt(
                svgConstruction.fontData.MATH.MathConstants.AxisHeight.Value
                    .value,
                10
            );
            this.height = this.totalHeight / 2 + mathAxis;
            this.depth = this.totalHeight / 2 - mathAxis;
        } else {
            this.height = this.getMaxOfDimension(
                svgConstruction.partialSVGGlyphArray,
                "height"
            );
            this.depth = this.ymin;
        }
    }

    calculateYMin(partialSVGGlyphArray) {
        let depthArray = [];
        partialSVGGlyphArray.forEach(partialSVGGlyph => {
            depthArray.push(partialSVGGlyph.depth);
        });
        return -Math.min(...depthArray);
    }

    calculateTotalHeight(svgConstruction) {
        return svgConstruction.isVertical()
            ? this.getLengthOfMainAxis(svgConstruction)
            : this.getLengthOfCrossAxis(svgConstruction);
    }

    calculateTotalWidth(svgConstruction) {
        return svgConstruction.isVertical()
            ? this.getLengthOfCrossAxis(svgConstruction)
            : this.getLengthOfMainAxis(svgConstruction);
    }

    getLengthOfCrossAxis(svgConstruction) {
        let glyphArray = svgConstruction.partialSVGGlyphArray;
        let result = svgConstruction.isVertical()
            ? glyphArray[0].width
            : this.getMaxOfDimension(glyphArray, "height") +
              this.getMaxOfDimension(glyphArray, "depth");
        return result;
    }

    getMaxOfDimension(partialSVGGlyphArray, dimension) {
        let dimensionArray = [];
        partialSVGGlyphArray.forEach(partialSVGGlyph => {
            dimensionArray.push(partialSVGGlyph[dimension]);
        });
        return Math.max(...dimensionArray);
    }

    getLengthOfMainAxis(svgConstruction) {
        let result = svgConstruction.partialSVGGlyphArray.reduce(
            (acc, partialSVGGlyph, index) => {
                let partialLength = svgConstruction.isVertical()
                    ? partialSVGGlyph.height - partialSVGGlyph.depth
                    : partialSVGGlyph.width;
                let overlap = svgConstruction.overlapArray[index]
                    ? svgConstruction.overlapArray[index]
                    : 0;
                return acc + partialLength - overlap;
            },
            0
        );
        return result;
    }
}
