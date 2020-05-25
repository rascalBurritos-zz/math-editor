import React from "react";

export class ExtendedGlyph extends React.Component {

    render() {
        let partialGlyphArray = this.props.data.svgConstruction
            .partialSVGGlyphArray;
        let paths = partialGlyphArray.map((partialSVGGlyph, index) => {
            return (
                <path
                    key={index}
                    shapeRendering={partialSVGGlyph.shapeRendering}
                    transform={partialSVGGlyph.transform}
                    d={partialSVGGlyph.path}
                ></path>
            );
        });
        return (
            <m-extended style={this.props.data.css}>
                <svg  viewBox={this.props.data.viewBox}>
                    <g transform={this.props.data.svgConstruction.transform}>
                        {paths}
                    </g>
                </svg>
            </m-extended>
        );
    }
}
