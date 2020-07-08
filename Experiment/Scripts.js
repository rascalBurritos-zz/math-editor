import CaretHolder from './CaretHolder';
import CaretNode from './CaretNode';

export default class Scripts extends CaretHolder {
  _nucleus;
  _super;
  _sub;

  /**
   *
   */
  update() {
    this.leftCaretNode = this.nucleus.leftCaretNode;
    this.leftCaretNode.parent = this;
    this.rightCaretNode = new CaretNode();
    this.rightCaretNode.parent = this;
    const tweener = this.nucleus.rightCaretNode;
    tweener.parent = this;

    if (this.isSubValid()) {
      this._sub.rightCaretNode.right = this.rightCaretNode;
      this._sub.leftCaretNode.left = tweener;
      this._sub.leftCaretNode.parent = this;
      this._sub.rightCaretNode.parent = this;
      // case super doesn't exist
      this.rightCaretNode.left = this._sub.rightCaretNode;
      tweener.right = this._sub.leftCaretNode;
    }
    if (this.isSuperValid()) {
      this._super.rightCaretNode.right = this.rightCaretNode;
      this._super.leftCaretNode.left = tweener;
      this._super.leftCaretNode.parent = this;
      this._super.rightCaretNode.parent = this;

      this.rightCaretNode.left = this._super.rightCaretNode;
      tweener.right = this._super.leftCaretNode;
    }
  }

  /**
   * @return {boolean}
   */
  isSubValid() {
    return this._sub !== undefined;
  }
  /**
   * @return {boolean}
   */
  isSuperValid() {
    return this._super !== undefined;
  }
  /**
   * @param {Object} node
   */
  set nucleus(node) {
    this._nucleus = node;
    this.update();
  }
  /**
   * @param {Object} node
   */
  set super(node) {
    this._super = node;
    this.update();
  }
  /**
   * @param {Object} node
   */
  set sub(node) {
    this._sub = node;
    this.update();
  }

  /**
   * @return {Object}
   */
  get nucleus() {
    return this._nucleus;
  }
  /**
   * @return {Object}
   */
  get super() {
    return this._super;
  }
  /**
   * @return {Object}
   */
  get sub() {
    return this._sub;
  }
}
