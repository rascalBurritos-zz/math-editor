import Document_Node from '../../Abstract/Document_Node.js';
/** @typedef {import('./Vertical_List_Behavior').default} Vertical_List_Behavior  */
/**
 * @class
 */
export default class Vertical_List_Node extends Document_Node {
  /**
   * @param {Vertical_List_Behavior} verticalListBehavior
   */
  constructor(verticalListBehavior) {
    super(verticalListBehavior);
    this._elements = [];
  }
  /**
   *
   */
  update() {
    this.updateBehavior();
    this.linkCaretNodes();
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
    node.parent = this;
    this._elements.push(node);
    this.update();
  }

  /**
   * @param {Document_Node[]} elementArray Node array to
   *  set elements to
   */
  set elements(elementArray) {
    this._elements = elementArray;
    for (const ele of elementArray) {
      ele.parent = this;
    }
    this.update();
  }
  /**
   *
   */
  linkCaretNodes() {
    /**
     * first left one is fine
     * merge first right one and second left one
     * continue until reach last right one
     * last right one is fine
     *
     */
    if (this._elements.length === 0) return;
    this.leftCaretNode = this._elements[0].leftCaretNode;
    this.rightCaretNode = this._elements.slice(-1)[0].rightCaretNode;

    for (const [indexOfElement, element] of this._elements
      .slice(0, -1)
      .entries()) {
      // this makes the left right and the right left point to each other
      const left = element.rightCaretNode;
      const right = this._elements[indexOfElement + 1].leftCaretNode;
      right.linkLeftTo(left);
      left.linkRightTo(right);
    }
  }
}
