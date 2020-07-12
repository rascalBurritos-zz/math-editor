import displayEnvironmentFactory from './Document/displayEnvironmentFactory';
import verticalListFactory from './Document/verticalListFactory';
import textBlockFactory from './Document/textBlockFactory';
/** @typedef {import('../Abstract/Document_Node').default} Document_Node  */

/**
 * @param {Object} docList
 * @return {Document_Node}
 */
export default function documentNodeFactory(docList) {
  const nodeMap = {
    Display: displayEnvironmentFactory,
    Vertical_List: verticalListFactory,
    Text: textBlockFactory,
  };
  return nodeMap[docList.type](docList);
}
