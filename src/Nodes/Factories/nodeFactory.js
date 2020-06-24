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
import DependancyOrganizer from './DependancyOrganizer.js';
import skewedFractionFactory from './Branch/skewedFractionFactory.js';
import delimiterFactory from './Branch/delimiterFactory.js';

/** @typedef {import('../Abstract/Document_Node.js').default} Document_Node*/
/** @typedef {import('../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../Types/Spacing_Style.js').default} Spacing_Style  */

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
 * @return {Document_Node}
 */
export default function nodeFactory(mathList, fontData) {
  const nodeMap = {
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
  };
  const node = nodeMap[mathList.type](mathList, fontData);
  registerDependancies();
  return node;

  /**
   *
   */
  function registerDependancies() {
    if (mathList.source) {
      DependancyOrganizer.registerSource(mathList.source, node);
    }
    if (mathList.drain) {
      DependancyOrganizer.registerDrain(mathList.drain, node);
    }
  }
}
