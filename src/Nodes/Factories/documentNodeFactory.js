import displayEnvironmentFactory from './Document/displayEnvironmentFactory';
/** @typedef {import('../../Abstract/Document_Node').default} Document_Node  */

/**
 * @param {Object} docList
 * @return {Document_Node}
 */
export default function documentNodeFactory(docList) {
  const nodeMap = {
    Display: displayEnvironmentFactory,
  };
  return nodeMap[docList.type](docList);
}
