/** @typedef {import('../Abstract/Document_Node').default} Document_Node  */
/** @typedef {import('./Caret').default} Caret  */

export default class Command {
  /**
   *
   * @param {Document_Node} rootNode
   * @param {Caret} caret
   */
  constructor(rootNode, caret) {
    this._rootNode = rootNode;
    this._caret = caret;
  }

  /**
   * @abstract
   */
  execute() {}
}
