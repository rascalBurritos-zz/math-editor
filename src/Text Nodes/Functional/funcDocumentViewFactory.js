import verticalListViewFactory from './Vertical List/VerticalListViewFactory';
import textBlockViewFactory from './Text Block/textBlockViewFactory';
/** @typedef {import('./BaseView').BaseView} BaseView  */

/**
 * @param {Object} docList
 * @return {BaseView}
 */
export default function funcDocumentViewFactory(docList) {
  const viewMap = {
    Vertical_List: verticalListViewFactory,
    Text_Block: textBlockViewFactory,
  };
  return viewMap[docList.type](docList);
}
