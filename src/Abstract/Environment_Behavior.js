import Behavior from './Behavior';

export default class Environment_Behavior extends Behavior {
  _childBehavior;

  /**
   *
   * @param {Object} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this.type = 'Environment';
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    return this._childBehavior !== undefined;
  }

  /**
   *
   */
  update() {
    if (!this._isValid()) return;
    const settings = this._typesetter.generateSettings(this._childBehavior);
    this._metrics = settings.metrics;
  }

  /**
   * @return {Behavior}
   */
  get childBehavior() {
    return this._childBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set childBehavior(behavior) {
    this._childBehavior = behavior;
    this.update();
  }
}
