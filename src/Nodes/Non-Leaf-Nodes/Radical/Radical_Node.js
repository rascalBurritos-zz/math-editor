import Document_Node from '../../Abstract/Document_Node';

export default class Radical_Node extends Document_Node {
  _radicand;
  _degree;

  /**
   * @param {Document_Node} node
   */
  set radicand(node) {
    this._radicand = node;
    this._behavior.radicandBehavior = node.behavior;
  }
  /**
   * @param {Document_Node} node
   */
  set degree(node) {
    this._degree = node;
    this._behavior.degreeBehavior = node.behavior;
  }
}
