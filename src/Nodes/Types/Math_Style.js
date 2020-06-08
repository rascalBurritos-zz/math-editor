/**
 * @class
 * @classdesc Font size and current Tex Style
 * @property {number} fontSize
 */
export default class Math_Style {
  /**
   * @param {string} type "D" | "T" | "S" | "SS"
   * @param {number} fontSize
   * @param {boolean} cramped
   */
  constructor(type, fontSize, cramped) {
    this.type = type;
    this.fontSize = fontSize;
    // emphasis?: "Regular" | "Bold" | "Italic" | "BoldItalic",

    // fontFamily?: "Math"| "Main" |
    //     "Size1" | "Size3" | "Size3" | "Size4" |
    //     "SansSerif" | "Caligraphic" | "AMS" | "Fraktur" | "Typewriter" | "Script",

    // cramped?: boolean
    this.cramped = cramped;
  }
}
