import verticalListViewFactory from './Vertical List/VerticalListViewFactory';
import textBlockViewFactory from './Text Block/textBlockViewFactory';
import TextEnvFactory from './Text Environment/TextEnvViewFactory';
import { TextLineViewFactory } from './Text Line/TextLineViewFactory';
import {
  TEXT_BLOCK_TYPE,
  TEXT_ENV_TYPE,
  TEXT_LINE_TYPE,
  VERTICAL_LIST_TYPE,
  DISPLAY_ENV_TYPE,
  FORMULA_TYPE,
  MATH_GLYPH_TYPE,
  FRACTION_TYPE,
  SCRIPTS_TYPE,
  RADICAL_TYPE,
} from './Node Types';
import displayEnvironmentFactory from '../Math Nodes/Display Environment/displayEnvViewFactory';
import formulaViewFactory from '../Math Nodes/Formula/formulaViewFactory';
import mathGlyphViewFactory from '../Math Nodes/Math Glyph/mathGlyphViewFactory';
import fractionViewFactory from '../Math Nodes/Fraction/FractionViewFactory';
import scriptsFactory from '../Math Nodes/Scripts/scriptsViewFactory';
import radicalViewFactory from '../Math Nodes/Radical/radicalViewFactory';
/** @typedef {import('./BaseView').BaseView} BaseView  */

const viewMap = {};
viewMap[TEXT_BLOCK_TYPE] = textBlockViewFactory;
viewMap[TEXT_ENV_TYPE] = TextEnvFactory;
viewMap[TEXT_LINE_TYPE] = TextLineViewFactory;
viewMap[VERTICAL_LIST_TYPE] = verticalListViewFactory;
viewMap[DISPLAY_ENV_TYPE] = displayEnvironmentFactory;

const mathMap = {};
mathMap[FORMULA_TYPE] = formulaViewFactory;
mathMap[MATH_GLYPH_TYPE] = mathGlyphViewFactory;
mathMap[FRACTION_TYPE] = fractionViewFactory;
mathMap[SCRIPTS_TYPE] = scriptsFactory;
mathMap[RADICAL_TYPE] = radicalViewFactory;

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
   * @param {*} mathList
   * @param {*} font
   * @param {*} style
   * @param {*} collectingView
   * @param {*} dependancyOrganizer
   * @return {Object}
   */
  static generateMath(
    mathList,
    font,
    style,
    collectingView,
    dependancyOrganizer
  ) {
    const id = mathList.id;
    const view = mathMap[mathList.type](
      mathList,
      font,
      style,
      collectingView,
      dependancyOrganizer
    );
    view.mathStyle = style;
    collectingView[id] = view;
    return view;
  }

  /**
   * @param {Object} docList
   * @param {Object} collectingView
   */
  static generateView(docList, collectingView) {
    const id = docList.id;
    const view = viewMap[docList.type](docList, collectingView);
    view.id = id;
    ViewMaster.viewPool[id] = view;
    collectingView[id] = view;
  }
}
