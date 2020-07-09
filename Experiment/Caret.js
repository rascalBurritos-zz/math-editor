export default class Caret {
  parent;
  index;

  /**
   *
   */
  moveLeft() {
    const newProps = this.parent.moveLeft(this.index);
    this.parent = newProps.parent;
    this.index = newProps.index;
    // for (const prop in newProps) {
    //   if (prop !== undefined) {
    //     this[prop] = newProps[prop];
    //   }
    // }
  }
}
