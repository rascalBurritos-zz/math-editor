import verticalListViewFactory, {
  VERTICAL_LIST_TYPE,
} from './Vertical List/VerticalListViewFactory';
import textBlockViewFactory, {
  TEXT_BLOCK_TYPE,
} from './Text Block/textBlockViewFactory';
import TextEnvFactory, {
  TEXT_ENV_TYPE,
} from './Text Environment/TextEnvViewFactory';
import {
  TEXT_LINE_TYPE,
  TextLineViewFactory,
} from './Text Line/TextLineViewFactory';
/** @typedef {import('./BaseView').BaseView} BaseView  */

/**
 * @param {Object} docList
 * @return {BaseView}
 */
export default function funcDocumentViewFactory(docList) {
  const viewMap = {};
  viewMap[VERTICAL_LIST_TYPE] = verticalListViewFactory;
  viewMap[TEXT_BLOCK_TYPE] = textBlockViewFactory;
  viewMap[TEXT_ENV_TYPE] = TextEnvFactory;
  viewMap[TEXT_LINE_TYPE] = TextLineViewFactory;
  return viewMap[docList.type](docList);
}
