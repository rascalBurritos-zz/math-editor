import Document_Node from './Document_Node';

export default class Leaf_Node extends Document_Node {
  /**
   * @param {Object} behavior
   */
  constructor(behavior) {
    super(behavior);
    const parentDocNode = this;
    const rcn = {
      left: this.leftCaretNode,
      parentDocNode,
      index: 'Leaf Start',
    };
    this.rightCaretNode.change(rcn);
    const lcn = {
      right: this.rightCaretNode,
      parentDocNode,
      index: 'Leaf End',
    };
    this.leftCaretNode.change(lcn);
  }
  /**
   * @override
   * @param {Node} aboveDocNode
   */
  setAboveOfCaretNodes(aboveDocNode) {
    this.leftCaretNode.above = aboveDocNode;
    this.rightCaretNode.above = aboveDocNode;
  }
  /**
   * @override
   * @param {Node} belowDocNode
   */
  setBelowOfCaretNodes(belowDocNode) {
    this.leftCaretNode.below = belowDocNode;
    this.rightCaretNode.below = belowDocNode;
  }
}
