import CaretNode from './CaretNode';
import CaretHolder from './CaretHolder';

export default class Formula extends CaretHolder {
  _elements = [];

  /**
   * @return {Array}
   */
  get elements() {
    return this._elements;
  }

  /**
   * @param {Array} e
   */
  set elements(e) {
    this._elements = e;
    this.linkCaretNodes();
  }

  /**
   *
   * @param  {...any} args
   */
  push(...args) {
    this._elements.push(...args);
    this.linkCaretNodes();
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
    this.leftCaretNode.parent = this;
    this.leftCaretNode.index = 0;
    this.rightCaretNode.parent = this;
    this.rightCaretNode.index = this._elements.length;

    for (const [index, element] of this._elements.slice(0, -1).entries()) {
      // this makes the left right and the right left point to the same things
      const middleMan = new CaretNode();
      middleMan.parent = this;
      middleMan.index = index + 1;

      const leftOfMiddle = element.rightCaretNode.left;
      const rightOfMiddle = this._elements[index + 1].leftCaretNode.right;
      // console.log(leftOfMiddle, rightOfMiddle);
      // console.log('hi');
      linkNodes(leftOfMiddle, middleMan);
      // console.log('ho');
      element.rightCaretNode = middleMan;
      linkNodes(middleMan, rightOfMiddle);
      this._elements[index + 1].leftCaretNode = middleMan;

      middleMan.middleman = 'middle';
    }

    /**
     * @param {CaretNode} a left node
     * @param {CaretNode} b right node
     */
    function linkNodes(a, b) {
      if (a === undefined || b === undefined) console.warn(a, b);
      a.right = b;
      b.left = a;
    }
  }
}
