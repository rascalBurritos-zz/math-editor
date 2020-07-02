import Document_Node from '../../Abstract/Document_Node.js';
/**
 * @class
 */
export default class Vertical_List_Node extends Document_Node {
  /**
   * @param {Vertical_List_Behavior} verticalListBehavior
   */
  constructor(verticalListBehavior) {
    super(verticalListBehavior);
    /**
     * List of descendants from left to right
     */
    this._elements = [];
  }

  /**
   * Updates the behavior if there is a change in the elements
   **/
  updateBehavior() {
    this._behavior.elementBehaviors = this._elements.map((element) => {
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
