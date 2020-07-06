import displayEnvironmentFactory from './Document/displayEnvironmentFactory';
import verticalListFactory from './Document/verticalListFactory';
import textEnvironmentFactory from './Document/textEnvironmentFactory';
/** @typedef {import('../Abstract/Document_Node').default} Document_Node  */

/**
 * @param {Object} docList
 * @return {Document_Node}
 */
export default function documentNodeFactory(docList) {
  const nodeMap = {
    Display: displayEnvironmentFactory,
    Vertical_List: verticalListFactory,
    Text: textEnvironmentFactory,
  };
  return nodeMap[docList.type](docList);
}
