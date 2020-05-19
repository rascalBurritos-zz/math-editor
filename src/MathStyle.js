export  class MathStyle {
    /**
     *
     * @param {string} type "D" | "T" | "S" | "SS"
     * @param {number} fontSize
     * @param {boolean} cramped
     */
    constructor(type, fontSize, cramped) {
        this.type = type;
        this.fontSize = fontSize;

        // emphasis?: "Regular" | "Bold" | "Italic" | "BoldItalic",

        // fontFamily?: "Math"| "Main" |
        //     "Size1" | "Size2" | "Size3" | "Size4" |
        //     "SansSerif" | "Caligraphic" | "AMS" | "Fraktur" | "Typewriter" | "Script",

        // cramped?: boolean
        this.cramped = cramped;
    }

    changeType(type, cramped) {
        return new MathStyle(type, this.fontSize, cramped)
    }
    changeFontSizeByFactor(factor){
        return new MathStyle(this.type,this.fontSize*factor,this.cramped)
    }
}
