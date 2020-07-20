import formulaFactory from './Branch/formulaFactory.js';
import glyphFactory from './Leaf/glyphFactory.js';
import scriptsFactory from './Branch/scriptsFactory.js';
import variantGlyphFactory from './Leaf/variantGlyphFactory.js';
import radicalFactory from './Branch/radicalFactory.js';
import accentFactory from './Branch/accentFactory.js';
import operatorFactory from './Branch/operatorFactory.js';
import fractionFactory from './Branch/fractionFactory.js';
import stackFactory from './Branch/stackFactory.js';
import stretchStackFactory from './Branch/stretchStackFactory.js';
import skewedFractionFactory from './Branch/skewedFractionFactory.js';
import barFactory from './Branch/barFactory.js';
import delimiterFactory from './Branch/delimiterFactory.js';
import Behavior from '../../Abstract/Behavior.js';
import MathBehavior from '../../Abstract/MathBehavior.js';

/** @typedef {import('../../Abstract/Document_Node.js').default} Document_Node*/
/** @typedef {import('../../Math Nodes/Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Math Nodes/Types/Spacing_Style.js').default} Spacing_Style  */

/**
 * @typedef {Object} MathList
 * @abstract
 * @property {String} type
 * @property {Spacing_Style} spacingStyle
 */

/**
 * @typedef {Object} GlyphType
 * @property {String} unicode
 *
 * @typedef {MathList & GlyphType} GlyphList
 */

/**
 * @typedef {Object} FormulaType
 * @property {MathList[]} elements
 *
 * @typedef {MathList & GlyphType} FormulaList
 */
/**
 * @param {Object} mathList {type, nodeSpecificInfo}
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {MathBehavior}
 */
export default function mathViewFactory(
  mathList,
  fontData,
  dependancyOrganizer
) {
  const viewMap = {
    Formula: formulaFactory,
    Glyph: glyphFactory,
    Scripts: scriptsFactory,
    Variant_Glyph: variantGlyphFactory,
    Radical: radicalFactory,
    Accent: accentFactory,
    Operator: operatorFactory,
    Fraction: fractionFactory,
    Skewed_Fraction: skewedFractionFactory,
    Stack: stackFactory,
    Stretch_Stack: stretchStackFactory,
    Delimiter: delimiterFactory,
    Overbar: barFactory,
    Underbar: barFactory,
  };
  const behavior = viewMap[mathList.type](
    mathList,
    fontData,
    dependancyOrganizer
  );
  registerDependancies();
  return behavior;
  /**
   *
   */
  function registerDependancies() {
    if (mathList.source) {
      dependancyOrganizer.registerSource(mathList.source, behavior);
    }
    if (mathList.drain) {
      dependancyOrganizer.registerDrain(mathList.drain, behavior);
    }
  }
}
