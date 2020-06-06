import Behavior from "../Behavior";
class FormulaBehavior extends Behavior {
    _elements;
    constructor(behaviorSpec) {
        super(behaviorSpec);
    }

    set elements(elements) {
        this._elements = elements;
    }

    _updateMetrics() {
        this._metrics.height = this.calculateHeight();
        this._metrics.depth = this.calculateDepth();
        this._metrics.width = this.calculateWidth();
        this.updateComponentStyleDimensions();
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
    calculateHeight() {
        let heightArray = this._elements.map(ele => ele.metrics.height);
        return Math.max(...heightArray);
    }
    calculateDepth() {
        let depthArray = this._elements.map(ele => ele.metrics.depth);
        return Math.min(...depthArray);
    }
    calculateWidth() {
        let rawWidth = this._elements.reduce((acc, curr) => {
            return acc + curr.metrics.width;
        }, 0);
        let rawTypes = this._elements.map(ele => ele.spacingStyle)
        let defactoSpacingTypes = calculateDefactoTypes(rawTypes)
        let interElementSpacing = this._typesetter.getInterElementSpacing(defactoSpacingTypes)
        let tota
        function calculateTypes(rawTypes){
            //TODO
            //should account for spacing type coercions
           return rawtypes 
        }
    }
}
