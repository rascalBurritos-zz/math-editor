import nodeFactory from './nodeFactory.js';
import DependancyOrganizer from './DependancyOrganizer.js';
/** @typedef {import('../Types/Math_Style.js').default}  Math_Style*/
/** @typedef {import('../../Abstract/Document_Node.js').default} Document_Node */
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
  const tree = nodeFactory(mathList, context.fontData);
  if (DependancyOrganizer.verifyPairs()) {
    DependancyOrganizer.linkDependants();
    DependancyOrganizer.clearMap();
  } else {
    console.log('failed dependants');
  }
  tree.behavior.mathStyle = context.rootStyle;
  return tree;
}
