import { DIRECTION } from './CaretTraverser';

/**
 * @typedef {Object} caretMap
 *
 * @property {Function} modelKeyInDirection
 * @property {Function} closestCaretKey
 * @property {Function} directMove
 */

const ScriptsCaretMap = {
  caretKeys: ['sub0', 'sub1', 'super0', 'super1', 'nuc1'],
  defaultKeys: ['Caret Outside Left', 'Caret Outside Right'],

  /**
   *
   * @param {String} caretKey
   * @param {String} direction  of type DIRECTION
   * @param {Object} parentModel  of type DIRECTION
   * @return {String} model key
   */
  modelKeyInDirection: function (caretKey, direction, parentModel) {
    const type = this.determineScriptType(parentModel);
    const modelString = type === 'SUB' ? 'sub' : 'super';
    const goingRight = {
      'Caret Outside Right': 'Model Outside Right',
      'Caret Outside Left': 'nuc',
      sub0: 'sub',
      sub1: 'Model Outside Right',
      super0: 'super',
      super1: 'Model Outside Right',
      nuc1: modelString,
    };
    const goingLeft = {
      'Caret Outside Right': modelString,
      'Caret Outside Left': 'Model Outside Left',
      sub0: 'nuc',
      sub1: 'sub',
      super0: 'nuc',
      super1: 'super',
      nuc1: 'nuc',
    };
    const map = direction === DIRECTION.RIGHT ? goingRight : goingLeft;
    return map[caretKey];
  },

  // for glyphs
  directMove: function (caretKey, direction, parentModel) {
    const type = this.determineScriptType(parentModel);
    const modelString = type === 'SUB' ? 'sub' : 'super';
    const goingRight = {
      'Caret Outside Right': 'Caret Outside Right',
      'Caret Outside Left': 'nuc1',
      sub0: 'sub1',
      sub1: 'Caret Outside Right',
      super0: 'super1',
      super1: 'Caret Outside Right',
      nuc1: modelString + '0',
    };
    const goingLeft = {
      'Caret Outside Right': modelString + '1',
      'Caret Outside Left': 'Caret Outside Left',
      sub0: 'nuc1',
      sub1: 'sub0',
      super0: 'nuc1',
      super1: 'super0',
      nuc1: 'Caret Outside Left',
    };
    const map = direction === DIRECTION.RIGHT ? goingRight : goingLeft;
    return map[caretKey];
  },
  // for hop outs
  closestCaretKey(modelKey, direction, parentModel) {
    const type = this.determineScriptType(parentModel);
    const modelString = type === 'SUB' ? 'sub' : 'super';
    const goingRight = {
      'Model Outside Right': 'Caret Outside Right',
      'Model Outside Left': 'Caret Outside Left',
      sub: 'sub1',
      super: 'super1',
      nuc: modelString + '0',
    };
    const goingLeft = {
      'Model Outside Right': modelString + '1',
      'Model Outside Left': 'Caret Outside Left',
      sub: 'sub0',
      super: 'super0',
      nuc: 'Caret Outside Left',
    };
    const map = direction === DIRECTION.RIGHT ? goingRight : goingLeft;
    return map[modelKey];
  },

  determineScriptType(parentModel) {
    const doesSubExist = parentModel.sub !== undefined;
    const doesSuperExist = parentModel.super !== undefined;
    if (doesSubExist && doesSuperExist) return 'BOTH';
    if (doesSubExist) return 'SUB';
    if (doesSuperExist) return 'SUPER';
    console.warn('INVALID SCRIPT TYPE');
    return 'Fail';
  },
};
