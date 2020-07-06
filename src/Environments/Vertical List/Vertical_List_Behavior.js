import Behavior from '../../Abstract/Behavior.js';
import VerticalList from '../../React-Components/Document/VerticalList.js';
/** @typedef {import('../../Math Nodes/Types/Math_Style.js').default} Math_Style  */
/** @typedef {import('../../Math Nodes/Types/Spacing_Style').default} Spacing_Style  */
/** @typedef {import('../../Abstract/MathBehavior.js').behaviorSpec} behaviorSpec */

/**
 * @class
 */
export default class Vertical_List_Behavior extends Behavior {
  _elementBehaviors;
  /**
   *
   * @param {Object} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this.type = 'Vertical_List';
    this._component = VerticalList;
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    return this._elementBehaviors !== undefined;
  }

  /**
   *
   */
  update() {
    if (!this._isValid()) return;
    const vlb = this;
    const settings = this._typesetter.generateSettings(this._elementBehaviors);
    updateElementComponentStyles();

    /**
     *
     */
    function updateElementComponentStyles() {
      for (const [index, behavior] of vlb._elementBehaviors.entries()) {
        behavior.appendComponentStyle(settings.elementComponentStyles[index]);
      }
    }
  }

  /**
   * @return {Behavior[]}
   */
  get elementBehaviors() {
    return this._elementBehaviors;
  }
  /**
   * @param {Behavior[]} behaviors
   */
  set elementBehaviors(behaviors) {
    this._elementBehaviors = behaviors;
    this.update();
  }
}
