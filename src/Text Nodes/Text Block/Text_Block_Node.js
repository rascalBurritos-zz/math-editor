import Document_Node from '../../Abstract/Document_Node';

/**
 * @class
 */
export default class Text_Block_Node extends Document_Node {
  /**
   * @param {Object}  textEnvironmentBehavior
   */
  constructor(textEnvironmentBehavior) {
    super(textEnvironmentBehavior);
    /**
     * List of descendants from left to right
     */
    this._elements = [];
  }

  /**
   * Updates the behavior if there is a change in the elements
   **/
  updateBehavior() {
    this._behavior.elements = this._elements.map((element) => {
      return element.behavior;
    });
  }

  /**
   * add Document Node to end of elements
   * @param {Document_Node} node node to be pushed
   */
  push(node) {
    this._elements.push(node);
    this.updateBehavior();
  }

  /**
   * @param {Document_Node[]} elementArray Node array to
   *  set elements to
   */
  set elements(elementArray) {
    this._elements = elementArray;
    this.updateBehavior();
  }
}
