import produce from 'immer';
import textGlyphViewFactory from '../Text Glyph/textGlyphViewFactory';
import Metrics from '../../../Math Nodes/Types/Metrics';
import fontMapper from '../../../Factories/Document/fontMapper';
import { getComponentStyle } from '../BaseView';
import TextBlock from '../../../React-Components/Document/TextBlock';

/** @typedef {import('../BaseView').BaseView} BaseView */

/**
 * @typedef {Object} _TextBlockView
 * @property {Array} elements
 */
/**
 * @typedef {BaseView & _TextBlockView} TextBlockView
 */

/**
 * @param {Object} documentList
 * @return {TextBlockView}
 */
export default function textBlockViewFactory(documentList) {
  const font = fontMapper(documentList.fontName);
  const childViews = getChildViews(documentList.content, font);
  const metrics = generateMetrics(childViews);
  const styledChildViews = addViewStyles(childViews, metrics);
  const view = getView(metrics, styledChildViews);
  return view;

  /**
   *
   * @param {Metrics} metrics
   * @param {Array} childViews
   * @return {TextBlockView} Complete View
   */
  function getView(metrics, childViews) {
    const componentStyle = getComponentStyle(metrics);
    return {
      component: TextBlock,
      componentStyle,
      metrics,
      type: 'Text_Block',
      elements: childViews,
    };
  }

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

  /**
   * @param {Array} viewArray
   * @param {Metrics} metrics
   * @return {Array}
   */
  function addViewStyles(viewArray, metrics) {
    const styledViewArray = viewArray.map((element) => {
      const marginTop = metrics.height - element.metrics.height;
      return produce(element, (prevElement) => {
        prevElement.componentStyle.marginTop = marginTop;
      });
    });

    return styledViewArray;
  }
  /**
   * @param {Array} viewArray
   * @return {Metrics}
   */
  function generateMetrics(viewArray) {
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
}
