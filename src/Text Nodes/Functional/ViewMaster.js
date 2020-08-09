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
   * @param {number} id
   * @param {Object} currentView
   * @return {boolean}
   */
  static getCached(id, currentView) {
    const viewPool = ViewMaster.viewPool;
    if (viewPool[id] !== undefined) {
      addToCurrentView(id, currentView);
      return true;
    }
    return false;
    /**
     * @param {*} id
     * @param {*} collectingView
     */
    function addToCurrentView(id, collectingView) {
      const cs = Object.assign({}, viewPool[id].componentStyle);
      const properties = {
        componentStyle: { value: cs },
      };
      collectingView[id] = Object.create(viewPool[id], properties);
      if ('childIds' in collectingView[id]) {
        for (let i = 0; i < collectingView[id].childIds.length; i++) {
          addToCurrentView(collectingView[id].childIds[i], collectingView);
        }
      }
    }
  }

  /**
   * @param {Object} docList
   * @param {Object} currentView
   */
  static generateView(docList, currentView) {
    if (!ViewMaster.getCached(docList.id, currentView)) {
      const view = viewMap[docList.type](docList, currentView);
      view.id = docList.id;
      ViewMaster.viewPool[docList.id] = view;
      currentView[docList.id] = view;
    }
  }
}
