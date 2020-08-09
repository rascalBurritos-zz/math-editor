import textGlyphViewFactory from '../Text Glyph/textGlyphViewFactory';
import Metrics from '../../../Math Nodes/Types/Metrics';
import fontMapper from '../../../Factories/Document/fontMapper';
import { TextBlock } from '../../../React-Components/Text/TextBlock';
import { getViewGenerator } from '../BaseViewFactory';
import { TEXT_BLOCK_TYPE } from '../Node Types';

/** @typedef {import('../BaseView').BaseView} BaseView */

/**
 * @typedef {Object} _TextBlockView
 * @property {Array} elements
 */
/**
 * @typedef {BaseView & _TextBlockView} TextBlockView
 */
const getView = getViewGenerator(TEXT_BLOCK_TYPE, TextBlock);

/**
 * @param {Object} documentList
 * @return {TextBlockView}
 */
export default function textBlockViewFactory(documentList) {
  const font = fontMapper(documentList.fontName);
  const childViews = getChildViews(documentList.content, font);
  const metrics = generateMetrics(childViews);
  addViewStyles(childViews, metrics);
  const view = getView(metrics, childViews);
  return view;

  /**
   * @param {*} content
   * @param {*} font
   * @return {Array}
   */
  function getChildViews(content, font) {
    return content.split('').map((character) => {
      const unicode = character.codePointAt(0);
      const fontSize = documentList.fontSize;
      const glyphView = textGlyphViewFactory({ unicode, fontSize }, font);
      return glyphView;
    });
  }
}

/**
 * @param {Array} viewArray
 * @param {Metrics} metrics
 */
export function addViewStyles(viewArray, metrics) {
  // console.log(viewArray);
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
