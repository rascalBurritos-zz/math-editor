import { getComponentStyle } from './BaseView';

/**
 * @param {String} type
 * @param {React.Component | Function} component
 * @return {Function}
 */
export function getViewGenerator(type, component) {
  /**
   *
   * @param {Metrics} metrics
   * @param {Array} elements
   * @return {VerticalListView}
   */
  return function getView(metrics, elements) {
    const componentStyle = getComponentStyle(metrics);
    return {
      type,
      metrics,
      elements,
      componentStyle,
      component,
    };
  };
}
