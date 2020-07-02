/** @typedef {import('../../Abstract/MathBehavior').default} MathBehavior  */

export default class Display_Environment_Setter {
  /**
   * @param {Object} spec
   */
  constructor(spec) {
    this._rootStyle = spec.rootStyle;
  }

  /**
   * @param {MathBehavior} rootBehavior
   * @return {Object}
   */
  generateSettings(rootBehavior) {
    const rootStyle = this._rootStyle;
    return { rootStyle };
  }
}
