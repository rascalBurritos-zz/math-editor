import Behavior from '../../Abstract/Behavior.js';
import Scripts from '../../../React-Components/Scripts.js';
import Math_Style from '../../Types/Math_Style.js';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Script_Behavior extends Behavior {
  _superBehavior;
  _nucleusBehavior;
  _subBehavior;
  _scriptsComponentStyle;
  _subscriptComponentStyle;
  _superscriptComponentStyle;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Scripts;
    this._type = 'Scripts';
  }

  /**
   * @return {Object}
   */
  get scriptsComponentStyle() {
    return this._scriptsComponentStyle;
  }
  /**
   * @return {boolean}
   */
  doesSuperscriptExist() {
    return this._superBehavior !== undefined;
  }
  /**
   * @return {boolean}
   */
  doesSubscriptExist() {
    return this._subBehavior !== undefined;
  }

  /**
   *
   */
  update() {
    if (!this.isStyleValid()) return;
    const scriptsBehavior = this;
    checkValidScript();
    updateScriptStyles();
    const scriptSettings = this._typesetter.calculateScripts(
      this._pxpfu,
      this._nucleusBehavior,
      this._superBehavior,
      this._subBehavior
    );
    /*
     * Script Container Metrics
     * script Container css
     * script css
     * subscript css*/
    updateMetrics();
    updateNucleusComponentStyle();
    updateScriptsComponentStyle();
    /**
     * Assures the behavior
     * has at least one scirptk
     */
    function checkValidScript() {
      if (
        (!scriptsBehavior.doesSubscriptExist() &&
          !scriptsBehavior.doesSuperscriptExist()) ||
        scriptsBehavior._nucleusBehavior === undefined
      ) {
        console.log(scriptsBehavior);
        console.warn('INVALID SCRIPT');
      }
    }
    /**
     * changes scriptsComponentStyle h,w, and top margin
     */
    function updateScriptsComponentStyle() {
      scriptsBehavior._scriptsComponentStyle =
        scriptSettings.scriptsComponentStyle;
      if (scriptsBehavior.doesSuperscriptExist()) {
        scriptsBehavior.superBehavior.appendComponentStyle(
          scriptSettings.superscriptComponentStyle
        );
      }
      if (scriptsBehavior.doesSubscriptExist()) {
        scriptsBehavior.appendComponentStyle(
          scriptSettings._subscriptComponentStyle
        );
      }
    }

    /**
     * changes h,w,d of behavior._metrics
     */
    function updateMetrics() {
      scriptsBehavior._metrics = scriptSettings.scriptContainerMetrics;
      scriptsBehavior.updateComponentStyleDimensions();
    }

    /**
     * changes the component styles of super,sub, nuclues
     */
    function updateNucleusComponentStyle() {
      scriptsBehavior._nucleusBehavior.appendComponentStyle(
        scriptSettings.nucleusComponentStyle
      );
    }

    /**
     * changes Styles of Sub and Script according
     * to the current style
     */
    function updateScriptStyles() {
      scriptsBehavior._nucleusBehavior.mathStyle = scriptsBehavior._mathStyle;
      if (scriptsBehavior.doesSubscriptExist()) {
        scriptsBehavior._subBehavior.mathStyle = getScriptStyle(false);
      }
      if (scriptsBehavior.doesSuperscriptExist()) {
        scriptsBehavior._superBehavior.mathStyle = getScriptStyle(true);
      }
      /**
       * @param {boolean} isSuperscript
       * @return {Math_Style}
       */
      function getScriptStyle(isSuperscript) {
        const currentStyle = scriptsBehavior._mathStyle.type;
        const styleMap = {
          D: 'S',
          T: 'S',
          S: 'SS',
          SS: 'SS',
        };

        const isCramped = isSuperscript ? currentStyle.cramped : true;
        return new Math_Style(
          styleMap[currentStyle],
          scriptsBehavior._mathStyle.fontSize,
          isCramped
        );
      }
    }
  }

  /**
   * @param {Behavior} behavior
   */
  set superBehavior(behavior) {
    this._superBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get superBehavior() {
    return this._superBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set nucleusBehavior(behavior) {
    this._nucleusBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get nucleusBehavior() {
    return this._nucleusBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set subBehavior(behavior) {
    this._subBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get subBehavior() {
    return this._subBehavior;
  }

  /**
   * @param {Math_Style} style
   */
  set mathStyle(style) {
    this._mathStyle = style;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this.update();
  }
  /**
   * @return {Math_Style} style
   */
  get mathStyle() {
    return this._mathStyle;
  }

  /**
   * @return {boolean}
   */
  isStyleValid() {
    return this._mathStyle !== undefined;
  }
}
