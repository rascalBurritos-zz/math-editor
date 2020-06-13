export default class Adjuster {
  /**
   *
   * @param {*} unAdjustedStringPathArray
   * @param {*} viewBox
   * @param {*} adjustmentAmount
   * @param {*} radicalOptions
   */
  constructor(
    unAdjustedStringPathArray,
    viewBox,
    adjustmentAmount,
    radicalOptions = undefined
  ) {
    if (radicalOptions) {
      this.string = this.generateRadicalString(
        unAdjustedStringPathArray,
        radicalOptions
      );
      this.viewBox = this.getRadicalViewBoxString(viewBox, radicalOptions);
    } else {
      this.string = this.generateString(
        unAdjustedStringPathArray,
        adjustmentAmount
      );
      this.viewBox = this.getViewBoxString(viewBox, adjustmentAmount);
    }
  }
  /**
   *
   * @param {*} viewBox
   * @return {any}
   * @param {*} radicalOptions
   */
  getRadicalViewBoxString(viewBox, radicalOptions) {
    viewBox.xTotal += radicalOptions.horizontalAdjustment;
    viewBox.yTotal += radicalOptions.verticalAdjustment;
    return (
      viewBox.xMin +
      ', ' +
      viewBox.yMin +
      ', ' +
      viewBox.xTotal +
      ', ' +
      viewBox.yTotal
    );
  }
  /**
   *
   * @param {*} unAdjustedStringPathArray
   * @return {any}
   * @param {*} radicalOptions
   */
  generateRadicalString(unAdjustedStringPathArray, radicalOptions) {
    let adjustmentMap = {
      x: radicalOptions.horizontalAdjustment,
      y: radicalOptions.verticalAdjustment,
    };
    var completePath = [];
    for (const path of unAdjustedStringPathArray) {
      if (typeof path === 'string') {
        completePath.push(path);
      } else if (path.adjusted) {
        path[path.mainAxis] = path[path.mainAxis].isPositive
          ? adjustmentMap[path.mainAxis]
          : -adjustmentMap[path.mainAxis];

        const adjustedPath = path.type + ' ' + path.x + ' ' + path.y + ' ';
        completePath.push(adjustedPath);
      } else {
        console.log(typeof path);
        throw new Error('Wrong Path String Type');
      }
    }
    return completePath.join('');
  }
  /**
   *
   * @return {any}
   * @param {*} unAdjustedStringPathArray
   * @param {*} adjustmentAmount
   */
  generateString(unAdjustedStringPathArray, adjustmentAmount) {
    const completePath = [];
    for (const path of unAdjustedStringPathArray) {
      if (typeof path === 'string') {
        completePath.push(path);
      } else if (path.adjusted) {
        path[path.mainAxis] = path[path.mainAxis].isPositive
          ? adjustmentAmount
          : -adjustmentAmount;

        const adjustedPath = path.type + ' ' + path.x + ' ' + path.y + ' ';
        completePath.push(adjustedPath);
      } else {
        console.log(typeof path);
        console.warn('Wrong Path String Type');
      }
    }
    return completePath.join('');
  }
  /**
   *
   * @return {any}
   * @param {*} viewBox
   * @param {*} adjustmentAmount
   */
  getViewBoxString(viewBox, adjustmentAmount) {
    viewBox[viewBox.mainAxis + 'Total'] +=
      adjustmentAmount * viewBox.numberOfExtensions;
    return (
      viewBox.xMin +
      ', ' +
      viewBox.yMin +
      ', ' +
      viewBox.xTotal +
      ', ' +
      viewBox.yTotal
    );
  }
}
