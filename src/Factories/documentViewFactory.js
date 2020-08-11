import displayEnvironmentFactory from './Document/displayEnvironmentFactory';
import verticalListFactory from './Document/verticalListFactory';
import textBlockFactory from './Document/textBlockFactory';
/** @typedef {import('../Abstract/Behavior').default} Behavior  */

/**
 * @param {Object} docList
 * @return {Behavior}
 */
export default function documentViewFactory(docList) {
  const viewMap = {
    Display: displayEnvironmentFactory,
    Vertical_List: verticalListFactory,
    Text_Block: textBlockFactory,
  };
  return viewMap[docList.type](docList);
}
