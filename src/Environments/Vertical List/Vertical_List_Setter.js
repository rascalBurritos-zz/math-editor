/** @typedef {import('../../Abstract/Behavior').default}  Behavior */

export default class Vertical_List_Setter {
  /**
   * @param {Object} spec
   */
  constructor(spec) {
    this._baselineDistance = spec._baselineDistance;
    this._baselineBump = spec._baselineBump;
  }

  /**
   * @param {Behavior[]} elementBehaviors
   * @return {Object}
   */
  generateSettings(elementBehaviors) {
    const elementComponentStyles = [];
    for (let i = 0; i < elementBehaviors.length - 1; i++) {
      const actualBaselineDistance =
        elementBehaviors[i].metrics.depth +
        elementBehaviors[i + 1].metrics.height;
      const marginBottom =
        actualBaselineDistance > this._baselineDistance
          ? this._baselineBump
          : this._baselineDistance - actualBaselineDistance;
      elementComponentStyles.push({ marginBottom });
    }
    // for the last one
    elementComponentStyles.push({});
    return { elementComponentStyles };
  }
}
