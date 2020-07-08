import CaretNode from './CaretNode';

export default class CaretHolder {
  leftCaretNode = new CaretNode();
  rightCaretNode = new CaretNode();

  // /**
  //  * @param {CaretNode} caretNode
  //  * @param {Object} parent
  //  */
  // rightCaretNode(caretNode, parent) {
  //   this._rightCaretNode = caretNode;
  //   this._rightCaretNode.parent = parent;
  // }
  // /**
  //  * @param {CaretNode} caretNode
  //  * @param {Object} parent
  //  */
  // set leftCaretNode(caretNode, parent) {
  //   this._leftCaretNode = caretNode;
  //   this._leftCaretNode.parent = parent;
  // }
  // /**
  //  * @return {CaretNode}
  //  */
  // get rightCaretNode() {
  //   return this._rightCaretNode;
  // }
  // /**
  //  * @return {CaretNode}
  //  */
  // get leftCaretNode() {
  //   return this._leftCaretNode;
  // }
}
