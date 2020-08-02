import Environment_Behavior from '../../Abstract/Environment_Behavior';
import TextEnvironment from '../../React-Components/Text/TextEnvironment';

export default class Text_Environment_Behavior extends Environment_Behavior {
  /**
   * @param {Object} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this.type = 'Text_Environment';
    this._component = TextEnvironment;
  }
}
