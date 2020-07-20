import { DIRECTION } from './CaretTraverser';

export default class TextBlockCaretMap {
  /**
   *
   * @param {Object} submodel
   */
  constructor(submodel) {
    this.numElements = submodel.content.length;
  }
}

// export default class TextBlockCaretMap {
//   /**
//    * @param {Object} submodel
//    */
//   constructor(submodel) {
//     this.numElements = submodel.content.length;
//     this.outsideRight = { outside: 'Right' };
//     this.outsideLeft = { outside: 'Left' };
//   }
//   /**
//    * @param {String} dirstr
//    * @return {number}
//    */
//   directionToChange(dirstr) {
//     return dirstr === DIRECTION.LEFT ? -0.5 : 0.5;
//   }

//   /**
//    *
//    */
//   get minIndex() {
//     const change = this.directionToChange(DIRECTION.LEFT);
//     return 0 + change;
//   }
//   /**
//    *
//    */
//   get maxIndex() {
//     const change = this.directionToChange(DIRECTION.RIGHT);
//     return this.numElements + change;
//   }

//   /**
//    * @param {Object} caretKey
//    * @return {number} index
//    */
//   getCaretKeyIndex(caretKey) {
//     if ('outside' in caretKey) {
//       return caretKey.outside === this.outsideLeft.outside
//         ? -1
//         : this.numElements + 1;
//     } else {
//       return caretKey.index;
//     }
//   }

//   /**
//    * @param {Object} caretKey
//    * @param {String} direction
//    * @return {Object} caretKey | modelKey
//    */
//   getNextItem(caretKey, direction) {
//     const caretIndex = this.getCaretKeyIndex(caretKey);
//     return this.getNextItemFromUniversalIndex(caretIndex, direction);
//   }

//   /**
//    * @param {number} index
//    * @param {String} direction
//    * @return {Object} caretKey | modelKey
//    */
//   getNextItemFromUniversalIndex(index, direction) {
//     const tbcm = this;
//     const change = this.directionToChange(direction);
//     const nextIndex = index + change;
//     if (nextIndex < this.minIndex) {
//       return wrapOutsideCaret(DIRECTION.LEFT);
//     } else if (nextIndex > this.maxIndex) {
//       return wrapOutsideCaret(DIRECTION.RIGHT);
//     }

//     if (nextIndex === Math.floor(nextIndex)) {
//       return { isCaret: false, key: ['elementBehaviors', index] };
//     } else {
//       return { isCaret: true, key: { index: nextIndex } };
//     }

//     /**
//      * @param {String} direction
//      * @return {Object}
//      */
//     function wrapOutsideCaret(direction) {
//       const key =
//         direction === DIRECTION.LEFT ? tbcm.outsideLeft : tbcm.outsideRight;
//       return { isCaret: true, key };
//     }
//   }

//   /**
//    * @param {Object} caretKey
//    * @param {String} direction
//    * @return {Object} box# | caret
//    */
//   directMove(caretKey, direction) {
//     const index = this.getCaretKeyIndex(caretKey);
//     return this.getNextCaretKeyInDirection(index, direction);
//   }
//   /**
//    *
//    * @param {Array} modelKey
//    * @param {String} direction
//    * @return {Object}
//    */
//   closestCaretKey(modelKey, direction) {
//     const index = modelKey.slice(-1)[0];
//     return this.getNextCaretKeyInDirection(index, direction);
//   }

//   /**
//    * @param {number} index
//    * @param {String} direction
//    * @return {Object}
//    */
//   getNextCaretKeyInDirection(index, direction) {
//     let isCaretKey = false;
//     let item;
//     while (!isCaretKey) {
//       item = this.getNextItemFromUniversalIndex(index, direction);
//       index += this.directionToChange(direction);
//       isCaretKey = item.isCaret;
//     }
//     return item.key;
//   }
// }
