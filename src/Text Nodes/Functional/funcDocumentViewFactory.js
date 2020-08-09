import verticalListViewFactory from './Vertical List/VerticalListViewFactory';
import textBlockViewFactory from './Text Block/textBlockViewFactory';
import TextEnvFactory from './Text Environment/TextEnvViewFactory';
import { TextLineViewFactory } from './Text Line/TextLineViewFactory';
import {
  TEXT_BLOCK_TYPE,
  TEXT_ENV_TYPE,
  TEXT_LINE_TYPE,
  VERTICAL_LIST_TYPE,
} from './Node Types';
/** @typedef {import('./BaseView').BaseView} BaseView  */

const viewMap = {};
viewMap[TEXT_BLOCK_TYPE] = textBlockViewFactory;
viewMap[TEXT_ENV_TYPE] = TextEnvFactory;
viewMap[TEXT_LINE_TYPE] = TextLineViewFactory;
viewMap[VERTICAL_LIST_TYPE] = verticalListViewFactory;

const cache = {};

/**
 * @param {Object} docList
 * @return {BaseView}
 */
export default function funcDocumentViewFactory(docList) {
  if (docList.id in cache) {
    const cs = Object.assign({}, cache[docList.id].componentStyle);
    return Object.create(cache[docList.id], { componentStyle: { value: cs } });
  }
  const view = viewMap[docList.type](docList);
  view.id = docList.id;
  cache[docList.id] = view;
  return view;
}
