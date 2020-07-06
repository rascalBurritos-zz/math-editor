import DisplayEnvironment from '../../React-Components/Document/DisplayEnvironment';
import Environment_Behavior from '../../Abstract/Environment_Behavior';

export default class Display_Environment_Behavior extends Environment_Behavior {
  /**
   * @param {Object} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this.type = 'Display_Environment';
    this._component = DisplayEnvironment;
  }
}
