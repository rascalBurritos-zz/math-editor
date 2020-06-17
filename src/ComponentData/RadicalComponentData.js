import { Radical } from '../React-Components/Radical.js';
//formula component for component Factory
import { FormulaComponentData } from './FormulaComponentData.js';
import { determineTypeOfVariant } from './Variants/determineTypeOfVariant.js';

export class RadicalComponentData {
  constructor(mathSpec) {
    this.mathSpec = mathSpec;
    this.setMathList(mathSpec);
  }

  setMathList(mathSpec) {
    this.component = Radical;
    this.radicalConstants = this.getConstants();
    this.degree = this.generateDegree();
    this.radicand = this.generateRadicand();
    this.delimiter = this.generateDelimiter();
    this.rule = this.generateRule();
    this.positionRadicand();
    this.radicandContainerCSS = this.getRadicandContainerCSS();
    this.positionDegree();
    this.setDimensions();
    this.addExtraAscenderToMargins();
    this.css = this.getCSS();
    console.log(this.radicandDelta);
  }

  positionDegree() {
    let kernLeft = this.radicalConstants.kernBeforeDegree * this.mathSpec.pxpfu;
    let kernRight = this.radicalConstants.kernAfterDegree * this.mathSpec.pxpfu;
    this.degree.css.marginLeft = kernLeft;
    this.degree.css.marginRight = kernRight;
    this.degreeAdjustment = this.degree.width + kernLeft + kernRight;
  }
  addExtraAscenderToMargins() {
    this.delimiter.css.marginTop =
      this.radicalConstants.extraAscender * this.mathSpec.pxpfu + 'px';
    this.radicandContainerCSS.marginTop =
      this.radicalConstants.extraAscender * this.mathSpec.pxpfu + 'px';
  }
  setDimensions() {
    let extraAscender =
      this.radicalConstants.extraAscender * this.mathSpec.pxpfu;
    let mathAxis = this.radicalConstants.mathAxis * this.mathSpec.pxpfu;
    let delimiterHeight = this.delimiter.height + extraAscender - mathAxis;
    let radicandHeight =
      this.radicand.height +
      this.radicandDelta +
      this.radicalConstants.ruleThickness * this.mathSpec.pxpfu +
      this.verticalGap +
      extraAscender;
    let radicandDepth = this.radicand.depth + this.radicandDelta;
    this.degreeTop = this.getDegreeBaselineHeight() + this.degree.height;
    this.height = Math.max(delimiterHeight, radicandHeight, this.degreeTop);
    this.depth = Math.max(this.delimiter.depth, radicandDepth);
    this.degree.css.marginTop = this.height - this.degreeTop;
    this.width =
      this.delimiter.width + this.radicand.width + this.degreeAdjustment;
  }
  getRadicandContainerCSS() {
    let radicandHeight =
      this.radicandClearance +
      2 * this.radicandDelta +
      this.radicalConstants.ruleThickness * this.mathSpec.pxpfu;
    return {
      display: 'flex',
      flexDirection: 'column',
      height: radicandHeight,
    };
  }
  getDegreeBaselineHeight() {
    let delimiterTotalHeight = this.delimiter.height + this.delimiter.depth;
    let pxUpFromBottomOfDelimiter =
      (this.radicalConstants.degreeBottomRaisePercent / 100) *
      delimiterTotalHeight;
    //height relative to delimiter center
    let mathAxis = this.radicalConstants.mathAxis * this.mathSpec.pxpfu;
    let height = pxUpFromBottomOfDelimiter - this.delimiter.depth + mathAxis;
    return height;
  }
  positionRadicand() {
    let delimiterDescender =
      this.delimiter.height +
      this.delimiter.depth -
      this.radicalConstants.ruleThickness * this.mathSpec.pxpfu;
    let delta = (1 / 2) * (delimiterDescender - this.radicandClearance);
    this.radicandDelta = delta;
    this.verticalGap = this.determineRadicandVerticalGap();
    let marginTop = this.verticalGap + delta;
    this.radicand.css.marginTop = marginTop;
  }
  getConstants() {
    let mathConstants = this.mathSpec.fontData.MATH.MathConstants;
    let preParseConstants = {
      mathAxis: mathConstants.AxisHeight,
      verticalGap: mathConstants.RadicalVerticalGap,
      displayVerticalGap: mathConstants.RadicalDisplayStyleVerticalGap,
      ruleThickness: mathConstants.RadicalRuleThickness,
      extraAscender: mathConstants.RadicalExtraAscender,
      kernBeforeDegree: mathConstants.RadicalKernBeforeDegree,
      kernAfterDegree: mathConstants.RadicalKernAfterDegree,
      degreeBottomRaisePercent: mathConstants.RadicalDegreeBottomRaisePercent,
    };
    let radicalConstants = {};
    for (var constant in preParseConstants) {
      if (preParseConstants[constant].Value) {
        radicalConstants[constant] = parseInt(
          preParseConstants[constant].Value.value,
          10
        );
      } else {
        radicalConstants[constant] = parseInt(
          preParseConstants[constant].value,
          10
        );
      }
    }
    return radicalConstants;
  }
  getCSS() {
    return {
      display: 'flex',
      flexDirection: 'row',
      width: this.width,
      height: this.height + this.depth,
    };
  }

  generateDegree() {
    let degreeStyle = this.mathSpec.style.changeType('SS', false);
    let degree = new FormulaComponentData(
      this.mathSpec.mathList.degree,
      this.mathSpec.fontData,
      degreeStyle
    );
    return degree;
  }

  generateRule() {
    return {
      alignSelf: 'stretch',
      backgroundColor: 'black',
      height: this.radicalConstants.ruleThickness * this.mathSpec.pxpfu,
    };
  }
  generateRadicand() {
    let radicandStyle = this.mathSpec.style.changeType(
      this.mathSpec.style.type,
      true
    );
    let radicand = new FormulaComponentData(
      this.mathSpec.mathList.radicand,
      this.mathSpec.fontData,
      radicandStyle
    );
    this.radicandClearance = this.calculateRadicandClearance(radicand);

    return radicand;
  }

  calculateRadicandClearance(radicand) {
    let subClearance = radicand.height + radicand.depth;
    let totalClearance = subClearance + this.determineRadicandVerticalGap();
    return totalClearance;
  }
  determineRadicandVerticalGap() {
    let verticalGap =
      this.mathSpec.style.type === 'D'
        ? this.radicalConstants.displayVerticalGap
        : this.radicalConstants.verticalGap;
    console.log('Vertical Gap', verticalGap * this.mathSpec.pxpfu);
    return verticalGap * this.mathSpec.pxpfu;
  }
  generateDelimiter() {
    let unicode = '8730';
    let desiredSize = this.radicandClearance;
    let fontSize = this.mathSpec.style.fontSize;
    let direction = 'vertical';
    let fontData = this.mathSpec.fontData;
    return determineTypeOfVariant(
      unicode,
      desiredSize,
      fontSize,
      direction,
      fontData
    );
  }
}
