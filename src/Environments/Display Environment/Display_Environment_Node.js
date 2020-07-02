import Document_Node from '../../Abstract/Document_Node.js';
/** @typedef {import('../../Nodes/Branch Nodes/Formula/Formula_Node').default} Formula_Node */

/**
 * @class
 */
export default class Display_Environment_Node extends Document_Node {
  /**
   *
   */
  updateRootFormulaBehavior() {
    this._behavior.rootFormulaBehavior = this._rootFormula.behavior;
  }

  /**
   * @param {Document_Node} rootFormula Node array to
   *  set elements to
   */
  set rootFormula(rootFormula) {
    this._rootFormula = rootFormula;
    this.updateRootFormulaBehavior();
  }

  /**
   * @return {Document_Node}
   */
  get rootFormula() {
    return this._rootFormula;
  }
}
