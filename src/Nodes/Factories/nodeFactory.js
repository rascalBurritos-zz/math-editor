import formulaFactory from './formulaFactory.js';
import glyphFactory from './glyphFactory.js';
/** @typedef {import('../../Font/FontData').default} FontData  */
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
  };
  return nodeMap[mathList.type](mathList, fontData);
}
