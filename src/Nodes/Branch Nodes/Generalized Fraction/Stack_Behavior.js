import Generalized_Fraction_Behavior from './Generalized_Fraction_Behavior.js';
import Stack from '../../../React-Components/Stack.js';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Stack_Behavior extends Generalized_Fraction_Behavior {
  _ruleStyle;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Stack';
    this._component = Stack;
  }

  /**
   * @override
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    this.updateNumAndDenomComponentStyles(settings);
  }
}
