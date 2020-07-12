import CaretNode from './CaretNode';

export default class CaretHolder {
  /**
   *
   */
  constructor() {
    const lcn = {
      dependants: [_directlySetLeftCaretNode],
      parent: this,
    };
    const rcn = {
      dependants: [_directlySetRightCaretNode],
      parent: this,
    };
    this._leftCaretNode = new CaretNode(lcn);
    this._rightCaretNode = new CaretNode(rcn);
    const caretHolder = this;

    /**
     * @param {CaretNode} lcn
     */
    function _directlySetLeftCaretNode(lcn) {
      caretHolder._leftCaretNode = lcn;
    }
    /**
     * @param {CaretNode} rcn
     */
    function _directlySetRightCaretNode(rcn) {
      caretHolder._rightCaretNode = rcn;
    }
  }

  /**
   * @param {CaretNode} rcn
   */
  set rightCaretNode(rcn) {
    this._rightCaretNode.syncDependants(rcn);
  }
  /**
   * @return {CaretNode}
   */
  get rightCaretNode() {
    return this._rightCaretNode;
  }
  /**
   * @param {CaretNode} lcn
   */
  set leftCaretNode(lcn) {
    this._leftCaretNode.syncDependants(lcn);
  }
  /**
   * @return {CaretNode}
   */
  get leftCaretNode() {
    return this._leftCaretNode;
  }
}
