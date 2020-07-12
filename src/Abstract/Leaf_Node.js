import Document_Node from './Document_Node';

export default class Leaf_Node extends Document_Node {
  /**
   * @param {Object} behavior
   */
  constructor(behavior) {
    super(behavior);
    const parent = this;
    const rcn = { left: this.leftCaretNode, parent, index: 'Leaf Start' };
    this.rightCaretNode.change(rcn);
    const lcn = { right: this.rightCaretNode, parent, index: 'Leaf End' };
    this.leftCaretNode.change(lcn);
  }
}
