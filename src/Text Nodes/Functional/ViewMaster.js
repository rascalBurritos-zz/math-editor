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
import { NodeTable } from '../../Interaction/Tables/nodeTable';
import textGlyphViewFactory, {
  TEXT_GLYPH_TYPE,
} from './Text Glyph/textGlyphViewFactory';
/** @typedef {import('./BaseView').BaseView} BaseView  */

const viewMap = {};
viewMap[TEXT_BLOCK_TYPE] = textBlockViewFactory;
viewMap[TEXT_ENV_TYPE] = TextEnvFactory;
viewMap[TEXT_LINE_TYPE] = TextLineViewFactory;
viewMap[VERTICAL_LIST_TYPE] = verticalListViewFactory;

export class ViewMaster {
  static factoryMap = viewMap;
  static viewPool = {};

  /**
   *
   * @param {Object} model
   */
  constructor(model) {
    this._viewCollection = {};
    this._rootId = model.id;
    ViewMaster.generateView(model, this._viewCollection);
  }

  /**
   * @return {number}
   */
  get rootId() {
    return this._rootId;
  }

  /**
   *
   */
  get viewCollection() {
    return this._viewCollection;
  }

  /**
   * @param {Object} docList
   * @param {Object} collectingView
   */
  static generateView(docList, collectingView) {
    const id = docList.id;
    // if (id in ViewMaster.viewPool && docList.type !== TEXT_BLOCK_TYPE) {
    //   collectingView[id] = ViewMaster.viewPool[id];
    //   const node = NodeTable.retrieve(docList.type);
    //   if ('getElements' in node) {
    //     collectingView[id].childIds = [];
    //     const elements = node.getElements(docList);
    //     for (let i = 0; i < elements.length; i++) {
    //       const childDoc = elements[i];
    //       collectingView[id].childIds.push(childDoc.id);
    //       ViewMaster.generateView(childDoc, collectingView);
    //     }
    //   }
    // } else {
    const view = viewMap[docList.type](docList, collectingView);
    view.id = id;
    ViewMaster.viewPool[id] = view;
    collectingView[id] = view;
    // }
  }
}
