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
   * @param {Array} childIds
   * @return {VerticalListView}
   */
  return function getView(metrics, childIds) {
    const componentStyle = getComponentStyle(metrics);
    return {
      type,
      metrics,
      childIds,
      componentStyle,
      component,
    };
  };
}
