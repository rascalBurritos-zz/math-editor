import Behavior from '../Behavior'
class FormulaBehavior extends Behavior {
    _elements;
    constructor(behaviorSpec) {
        super(behaviorSpec)
    }

    set elements(elements) {
        this._elements = elements;
    }

    _updateMetrics() {
        /**
         * 
         *  _metric.height = calculateHeight()
         *  _metric.width = calculateWidth()
         *  _metric.depth = calculateDepth()
         * function calculateHeight()
         * function calculateWidth()
         * function calculateDepth()
         */
    }
}