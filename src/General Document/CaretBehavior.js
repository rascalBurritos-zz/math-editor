/** @typedef {import('../../Experiment/CaretNode').default} CaretNode  */

import Leaf_Behavior from '../Abstract/Leaf_Behavior';
import Behavior from '../Abstract/Behavior';
import Point from '../Abstract/Point';

export default class CaretBehavior {
  /**
   *
   */
  constructor() {
    this._currentCaretNode = null;
    this.componentStyle = {};
    this.moveUp = this._moveVertical.bind(this, true);
    this.moveDown = this._moveVertical.bind(this, false);
    this.moveLeft = this._moveHorizontal.bind(this, true);
    this.moveRight = this._moveHorizontal.bind(this, false);
  }

  /**
   * @param {boolean} isAbove
   * @return {CaretBehavior}
   */
  _moveVertical(isAbove) {
    const direction = isAbove ? 'above' : 'below';
    const ccn = this._currentCaretNode[direction];
    if (ccn !== null) {
      let currentBehavior = ccn.behavior;
      let behaviorPosition = this.getPositionOfBehaviorWithinRoot(
        currentBehavior
      );
      let currentPosition = this.getPositionOfCaretNodeWithinRoot().subtract(
        behaviorPosition
      );
      const cb = new CaretBehavior();
      while (!(currentBehavior instanceof Leaf_Behavior)) {
        const parentBehavior = currentBehavior;
        currentBehavior = currentBehavior.getBehaviorClosestToPoint(
          currentPosition
        );
        behaviorPosition = parentBehavior.getRelativePositionOfBehavior(
          currentBehavior
        );
        currentPosition = currentPosition.subtract(behaviorPosition);
      }
      cb.currentCaretNode = currentBehavior.getCaretNodeClosestToPoint(
        currentPosition
      );
      return cb;
    } else {
      return;
      // let currentBehavior = currentCaretNode[
      //   direction
      // ].behavior.getBehaviorClosestToPoint(currentPosition);
    }
  }
  /**
   * @param {boolean} isLeft
   * @return {CaretBehavior}
   */
  _moveHorizontal(isLeft) {
    const cur = this._currentCaretNode;
    const cb = new CaretBehavior();
    const direction = isLeft ? 'left' : 'right';
    if (cur[direction] !== null) {
      cb.currentCaretNode = cur[direction];
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
    const pos = this.getPositionOfCaretNodeWithinRoot();
    this.componentStyle.left = pos.left;
    this.componentStyle.top = pos.top;
  }

  /**
   * @return {Object}
   */
  getPositionOfCaretNodeWithinRoot() {
    const index = this._currentCaretNode.index;
    const parentBehavior = this._currentCaretNode.parentDocNode.behavior;
    let position = parentBehavior.getRelativePositionOfCaretNode(index);
    const parentBehaviorPos = this.getPositionOfBehaviorWithinRoot(
      parentBehavior
    );
    position = position.add(parentBehaviorPos);
    return position;
  }

  /**
   * @param {Behavior} behavior
   * @return {Point}
   */
  getPositionOfBehaviorWithinRoot(behavior) {
    let junior = behavior;
    let senior = junior.parentBehavior;
    let position = new Point(0, 0);
    // crawl out to root
    while (senior !== null) {
      const relativePos = senior.getRelativePositionOfBehavior(junior);
      position = relativePos.add(position);
      junior = senior;
      senior = junior.parentBehavior;
    }
    return position;
  }
}
