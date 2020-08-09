import textGlyphViewFactory from '../Text Glyph/textGlyphViewFactory';
import Metrics from '../../../Math Nodes/Types/Metrics';
import fontMapper from '../../../Factories/Document/fontMapper';
import { getViewGenerator } from '../BaseViewFactory';
import { TEXT_BLOCK_TYPE } from '../Node Types';
import { Compound } from '../../../React-Components/Text/Compound';
import '../../../React-Components/Text/Styles/TextBlock';

/** @typedef {import('../BaseView').BaseView} BaseView */

/**
 * @typedef {Object} _TextBlockView
 * @property {Array} elements
 */
/**
 * @typedef {BaseView & _TextBlockView} TextBlockView
 */
const getView = getViewGenerator(TEXT_BLOCK_TYPE, Compound);

/**
 * @param {Object} documentList
 * @param {Object} currentView
 * @return {TextBlockView}
 */
export default function textBlockViewFactory(documentList, currentView) {
  const font = fontMapper(documentList.fontName);
  const childIds = getChildIds(documentList.content, font, currentView);
  const childViews = childIds.map((id) => currentView[id]);
  const metrics = generateMetrics(childViews);
  addViewStyles(childViews, metrics);
  const view = getView(metrics, childIds);
  return view;

  /**
   * @param {*} content
   * @param {*} font
   * @param {*} currentView
   * @return {Array}
   */
  function getChildIds(content, font, currentView) {
    const childIds = [];
    for (let i = 0; i < content.length; i++) {
      const fontSize = documentList.fontSize;
      const charInfo = { ...content[i], fontSize };
      textGlyphViewFactory(charInfo, font, currentView);
      childIds.push(content[i].id);
    }
    return childIds;
  }
}

/**
 * @param {Array} viewArray
 * @param {Metrics} metrics
 */
export function addViewStyles(viewArray, metrics) {
  viewArray.forEach((element) => {
    const marginTop = metrics.height - element.metrics.height;
    element.componentStyle.marginTop = marginTop;
  });
}
/**
 * @param {Array} viewArray
 * @return {Metrics}
 */
export function generateMetrics(viewArray) {
  const height = viewArray.reduce((acc, curr) => {
    return Math.max(acc, curr.metrics.height);
  }, 0);
  const width = viewArray.reduce((acc, curr) => {
    return acc + curr.metrics.width;
  }, 0);
  const depth = viewArray.reduce((acc, curr) => {
    return Math.max(acc, curr.metrics.depth);
  }, 0);
  const metrics = new Metrics(height, width, depth);
  return metrics;
}
