import Behavior from '../Behavior.js';

export default class Glyph_Behavior extends Behavior {
    constructor(spec) {
        super(spec)

    }

    _updateMetrics() { 
        this._metrics.height = this._typesetter.calculateHeight()
        this._metrics.depth = this._typesetter.calculateDepth()
        this._metrics.width  = this._typesetter.calculateWidth()
        this.updateComponentStyleDimensions()
    }

}
