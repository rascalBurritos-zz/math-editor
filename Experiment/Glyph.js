import CaretHolder from './CaretHolder';

export default class Glyph extends CaretHolder {
  /**
   *
   * @param {String} char
   */
  constructor(char) {
    super();
    this.rightCaretNode.left = this.leftCaretNode;
    this.rightCaretNode.parent = this;
    this.rightCaretNode.index = 70;
    this.leftCaretNode.right = this.rightCaretNode;
    this.leftCaretNode.index = 69;
    this.leftCaretNode.parent = this;
    this.char = char;
  }
}
