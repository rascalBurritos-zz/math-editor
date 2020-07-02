import Behavior from '../../Abstract/Behavior';
import DisplayEnvironment from '../../Nodes/React-Components/Math/DisplayEnvironment';

export default class Display_Environment_Behavior extends Behavior {
  _rootFormulaBehavior;

  /**
   *
   * @param {Object} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this.type = 'Display_Environment';
    this._component = DisplayEnvironment;
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    return this._rootFormulaBehavior !== undefined;
  }

  /**
   *
   */
  update() {
    if (!this._isValid()) return;
    // const deb = this;
    const settings = this._typesetter.generateSettings(
      this._rootFormulaBehavior
    );
    this._rootFormulaBehavior.mathStyle = settings.rootStyle;
    // updateChildComponentStyle();
    // /**
    //  *
    //  */
    // function updateChildComponentStyle() {
    //   deb._rootFormulaBehavior.appendComponentStyle(
    //     settings.rootComponentStyle
    //   );
    // }
  }

  /**
   * @return {Behavior}
   */
  get rootFormulaBehavior() {
    return this._rootFormulaBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set rootFormulaBehavior(behavior) {
    this._rootFormulaBehavior = behavior;
    this.update();
  }
}
