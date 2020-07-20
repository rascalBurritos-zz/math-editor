import { DIRECTION } from './CaretTraverser';

export default class VerticalListCaretMap {
  /**
   * @param {Object} submodel
   */
  constructor(submodel) {
    this.elements = submodel.elements;
    this.numElements = submodel.elements.length;
    this.outsideRight = { outside: 'Right' };
    this.outsideLeft = { outside: 'Left' };
  }

  /**
   * @param {Object} caretKey
   * @param {String} direction
   * @return {Object} direction
   */
  getNextItem(caretKey, direction) {
    const change = this.directionToChange(direction);
    const sideIndex = caretKey.slice(-1);
    const sideLeft = sideIndex === '0';
    const directionLeft = direction === DIRECTION.LEFT;
    let key;
    let isCaret;
    if ((sideLeft && directionLeft) || (!sideLeft && !directionLeft)) {
      isCaret = true;
      key = this.directMove(caretKey, direction);
    } else {
      isCaret = false;
      key = ['elementBehaviors', caretKey.rungIndex];
    }
    return { isCaret, key };
  }

  /**
   * @param {Object} caretKey
   * @param {String} direction
   * @return {Object} block# | caret
   */
  directMove(caretKey, direction) {
    if ('outside' in caretKey) {
      if (caretKey.outside === this.outsideRight.outside) {
        const lastIndex = this.numElements - 1;
        return direction === DIRECTION.RIGHT
          ? caretKey
          : { rungIndex: lastIndex, toLeft: false };
      } else {
        return direction === DIRECTION.LEFT
          ? caretKey
          : { rungIndex: 0, onLeft: true };
      }
    }

    const onLeft = caretKey.onLeft;
    const rungIndex = caretKey.rungIndex;
    if (rungIndex === 0 && onLeft && direction === DIRECTION.LEFT) {
      return this.outsideLeft;
    } else if (
      rungIndex === this.numElements - 1 &&
      !onLeft &&
      direction === DIRECTION.RIGHT
    ) {
      return this.outsideRight;
    }

    if (direction === DIRECTION.RIGHT) {
      if (onLeft) {
        return { rungIndex, onLeft: false };
      } else {
        return { rungIndex: rungIndex + 1, onLeft: true };
      }
    } // going left
    else {
      if (onLeft) {
        return { rungIndex: rungIndex - 1, onLeft: false };
      } else {
        return { rungIndex, onLeft: true };
      }
    }
  }

  /**
   * @param {Array} modelKey
   * @param {String} direction
   * @return {Object}
   */
  closestCaretKey(modelKey, direction) {
    const onLeft = direction === DIRECTION.LEFT;
    const rungIndex = modelKey[1]; // model key ['elementBehaviors',index]
    return { rungIndex, onLeft };
  }
}
