import Document_Node from '../../Abstract/Document_Node';

export default class Generalized_Fraction_Node extends Document_Node {
  _numerator;
  _denominator;

  /**
   * @param {Document_Node} node
   */
  set numerator(node) {
    this._numerator = node;
    this._behavior.numeratorBehavior = node.behavior;
  }
  /**
   * @param {Document_Node} node
   */
  set denominator(node) {
    this._denominator = node;
    this._behavior.denominatorBehavior = node.behavior;
  }
}
