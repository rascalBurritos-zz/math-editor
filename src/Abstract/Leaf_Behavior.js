import Behavior from './Behavior';
/** @typedef {import('../../Experiment/CaretNode').default} CaretNode  */

/** @typedef {import('../Abstract/Point').default} Point  */

export default class Leaf_Behavior extends Behavior {
  /**
   * @abstract
   * @param {Point} point
   *  {top, left}
   * @return {CaretNode}
   */
  getCaretNodeClosestToPoint(point) {
    return;
  }
}
