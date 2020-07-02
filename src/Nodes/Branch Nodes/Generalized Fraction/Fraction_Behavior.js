import Generalized_Fraction_Behavior from './Generalized_Fraction_Behavior.js';
import Fraction from '../../React-Components/Math/Fraction.js';

/** @typedef {import('../../../Abstract/MathBehavior').behaviorSpec} behaviorSpec  */

export default class Fraction_Behavior extends Generalized_Fraction_Behavior {
  _ruleStyle;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Fraction';
    this._component = Fraction;
  }

  /**
   * @override
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    this.updateNumAndDenomComponentStyles(settings);
    this._ruleStyle = settings.ruleStyle;
  }

  /**
   * @return {number}
   */
  get ruleStyle() {
    return this._ruleStyle;
  }
}
