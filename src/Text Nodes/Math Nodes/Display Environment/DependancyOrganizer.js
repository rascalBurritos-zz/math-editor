import { ViewMaster } from '../../Functional/ViewMaster';

export default class DependancyOrganizer {
  map = {};
  /**
   *
   * @param {*} drainId
   * @param {*} context
   * context includes mathList,font,desired style
   */
  registerDrain(drainId, context) {
    this.map[drainId] = context;
  }

  /**
   *
   * @param {*} collectingView
   */
  linkDependants(collectingView) {
    for (const drainId in this.map) {
      if (drainId) {
        const { mathList, font, style } = this.map[drainId];
        ViewMaster.generateMath(mathList, font, style, collectingView, this);
      }
    }
  }
}
