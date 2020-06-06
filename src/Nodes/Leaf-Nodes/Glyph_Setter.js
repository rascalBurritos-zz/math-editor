import Typesetter from './Typesetter'
export default class Glyph_Setter extends Typesetter {
    constructor(spec) {
        super(spec);
        this._asc = spec.asc;
        this._des = spec.dex;
        this._glyphMetric = spec.glyphMetric;
        this._italicsCorrection = spec._italicsCorrection;
        this._accentAttachmentPoint = spec.accentAttachmentPoint;
    }
    /**
     * return height above baseline of glyph
     */
    calculateHeight() {
        /**
         * glyphMetric y2
         */
    }

    calculateWidth() {
        /**
         * glyphMetric | x2 - x1|
         */
    }

    calculateDepth() {
        /**
         * glyphMetric y1 
         */
    }

    calculateInternalCharacterBox() { }
}