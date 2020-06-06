export default class Typesetter {
    constructor(spec) {
        this.upm = spec.upm;
    }
    _calculatePXPFU(mathStyle) {
        return mathStyle.fontSize / this.upm;
    }
}