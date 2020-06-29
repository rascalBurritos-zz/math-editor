import Document_Node from '../../Abstract/Document_Node';

export default class Bar_Node extends Document_Node {
  _nucleus;

  /**
   * @param {Object} g
   */
  set nucleus(g) {
    this._nucleus = g;
    this._behavior.nucleusBehavior = g.behavior;
  }

  /**
   * @return {Object}
   */
  get nucleus() {
    return this._nucleus;
  }
}
