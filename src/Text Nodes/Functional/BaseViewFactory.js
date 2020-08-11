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
   * @param {number} id
   * @param {Array} childIds
   * @return {VerticalListView}
   */
  return function getView(metrics, id, childIds) {
    const componentStyle = getComponentStyle(metrics);
    return {
      id,
      type,
      metrics,
      childIds,
      componentStyle,
      component,
    };
  };
}
