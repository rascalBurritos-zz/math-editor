import nodeFactory from './nodeFactory.js';
/** @typedef {import('../Types/Math_Style.js').default}  Math_Style*/
/** @typedef {import('../Abstract/Document_Node.js').default} Document_Node */
/** @typedef {import('./nodeFactory').MathList} MathList  */

/** @typedef {Object} FactoryContext
 * @property {Object} fontData
 * @property {Math_Style} rootStyle
 * */

/**
 * @param {MathList} mathList
 * @param {FactoryContext} context
 * @return {Document_Node}
 */
export default function nodeTreeFactory(mathList, context) {
  const dependantMap = {};
  const tree = nodeFactory(mathList, context.fontData, dependantMap);
  tree.behavior.mathStyle = context.rootStyle;
  return tree;
}
