import Generalized_Fraction_Behavior from './Generalized_Fraction_Behavior.js';
import Skewed_Fraction from '../../../React-Components/Skewed_Fraction.js';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Skewed_Fraction_Behavior extends Generalized_Fraction_Behavior {
  _slashBehavior;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Skewed_Fraction';
    this._component = Skewed_Fraction;
  }

  /**
   * @override
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    const skewedFractionBehavior = this;
    this.updateNumAndDenomComponentStyles(settings);
    updateSlash();
    /**
     *
     */
    function updateSlash() {
      skewedFractionBehavior._slashBehavior = settings.slashBehavior;
    }
  }

  /**
   * @return {number}
   */
  get slashBehavior() {
    return this._slashBehavior;
  }
}
