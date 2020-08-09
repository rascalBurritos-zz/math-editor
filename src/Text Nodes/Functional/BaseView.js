import Metrics from '../../Math Nodes/Types/Metrics';

/**
 * @typedef {Object} BaseView
 * @property {typeof React.Component | Function} component
 * @property {number} id
 * @property {String} type
 * @property {Object} componentStyle
 * @property {Metrics} metrics
 */

/**
 * @return {Object}
 */
export function createBaseView() {
  const view = {};
  view.type = 'Base';
  view.componentStyle = {};
  view.metrics = new Metrics(0, 0, 0);
  return view;
}

/**
 * @param {Metrics} metrics
 * @return {Object}
 */
export function getComponentStyle(metrics) {
  const height = metrics.height + metrics.depth;
  const width = metrics.width;
  return { height, width };
}
/**
 * @param {number} fontSize
 * @param {number} upm
 * @return {number}
 */
export function calculatePXPFU(fontSize, upm) {
  return fontSize / upm;
}
