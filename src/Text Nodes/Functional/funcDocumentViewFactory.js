import verticalListViewFactory, {
  VERTICAL_LIST_TYPE,
} from './Vertical List/VerticalListViewFactory';
import textBlockViewFactory from './Text Block/textBlockViewFactory';
import { TEXT_BLOCK_TYPE } from './Text Block/TextBlockNode';
/** @typedef {import('./BaseView').BaseView} BaseView  */

/**
 * @param {Object} docList
 * @return {BaseView}
 */
export default function funcDocumentViewFactory(docList) {
  const viewMap = {};
  viewMap[VERTICAL_LIST_TYPE] = verticalListViewFactory;
  viewMap[TEXT_BLOCK_TYPE] = textBlockViewFactory;
  return viewMap[docList.type](docList);
}
