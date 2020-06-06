import Metrics from './Metrics.js'
export default class Behavior {
    _componentStyle = {};
    _metrics = new Metrics(0, 0, 0);
    _mathStyle;
    _spacingStyle;
    _pxpfu;
    _typesetter;
    _component;
    // spec = typesetter, mathStyle, spacingStyle
    constructor(spec) {
        this._mathStyle = spec.mathStyle;
        this._typesetter = spec.typesetter;
        this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle)
        this._spacingStyle = spec.spacingStyle;
    }


    _updateMetrics() {
        console.warn("IMPLEMENT METHOD ON SUBCLASS", this)
        // let h = calculateHeight();
        // let d = calculateDepth();
        // let w = calculateWidth();
        // return new Metrics(h, d, w)
        // function calculateHeight() {
        //     console.warn("IMPLMENT METHOD ON SUBCLASS", this)
        //     return -1;
        // }
        // function calculateWidth() {
        //     console.warn("IMPLMENT METHOD ON SUBCLASS", this)
        //     return -1;
        // }
        // function calculateDepth() {
        //     console.warn("IMPLMENT METHOD ON SUBCLASS", this)
        //     return -1;
        // }
    }

    updateComponentStyleDimensions(){
        this.componentStyle.height = this.metrics.height + this.metrics.depth;
        this.componentStyle.width = this.metrics.width; 
    }
    get spacingStyle() {
        return this._spacingStyle;
    }

    set mathStyle(style) {
        this._mathStyle = style;
    }

    get metrics() {
        return this._metrics;
    }

    get componentStyle() {
        return this._componentStyle;
    }
    /**
     * @param {Object} addedStyles takes current style as input
     */
    set componentStyle(addedStyles) {
        for (let property in addedStyles) {
            if (["height", "width", "depth"].includes(property)) {
                console.warn("SET DIMENSION IN SET", this)
            }
            this._componentStyle[property] = addedStyles[property]
        }
    }
}
