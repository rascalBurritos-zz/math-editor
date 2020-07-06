/** @typedef {import('../../Abstract/Behavior').default} Behavior  */

export default class Text_Environment_Setter {
  /**
   * @param {Behavior} rootBehavior
   * @return {Object}
   */
  generateSettings(rootBehavior) {
    const metrics = rootBehavior.metrics.copy();
    return { metrics };
  }
}
