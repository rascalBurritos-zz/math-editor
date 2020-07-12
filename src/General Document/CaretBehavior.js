/** @typedef {import('../../Experiment/CaretNode').default} CaretNode  */

export default class CaretBehavior {
  /**
   *
   */
  constructor() {
    this._currentCaretNode = null;
    this.componentStyle = {};
    this.moveRight = this._moveRight.bind(this);
    this.moveLeft = this._moveLeft.bind(this);
  }

  /**
   * @return {CaretBehavior}
   */
  _moveLeft() {
    const cur = this._currentCaretNode;
    const cb = new CaretBehavior();
    if (cur.left !== undefined) {
      cb.currentCaretNode = cur.left;
    } else {
      return;
    }
    return cb;
  }
  /**
   * @return {CaretBehavior}
   */
  _moveRight() {
    const cur = this._currentCaretNode;
    const cb = new CaretBehavior();
    if (cur.right !== undefined) {
      cb.currentCaretNode = cur.right;
    } else {
      return;
    }
    return cb;
  }

  /**
   * @return {CaretNode}
   */
  get currentCaretNode() {
    return this._currentCaretNode;
  }
  /**
   * @param {CaretNode} cn
   */
  set currentCaretNode(cn) {
    this._currentCaretNode = cn;
    this.update();
  }

  /**
   *
   */
  update() {
    const pos = this.getPositionWithinRoot();
    this.componentStyle.left = pos.left;
    this.componentStyle.top = pos.top;
  }

  /**
   * @return {Object}
   */
  getPositionWithinRoot() {
    const index = this._currentCaretNode.index;
    const parentNode = this._currentCaretNode.parent;
    let position = parentNode.behavior.getRelativePositionOfCaretNode(index);
    let junior = parentNode;
    let senior = junior.parent;
    while (senior !== null) {
      const relativePos = senior.behavior.getRelativePositionOfBehavior(
        junior.behavior
      );
      position = combinePositions(relativePos, position);
      junior = senior;
      senior = junior.parent;
    }
    return position;

    /**
     *
     * @param {Object} a
     * @param {Object} b
     * @return {Object}
     * {top, left}
     */
    function combinePositions(a, b) {
      const left = a.left + b.left;
      const top = a.top + b.top;
      return { top, left };
    }
  }
}
