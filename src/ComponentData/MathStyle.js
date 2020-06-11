export class MathStyle {

   *

   *

   * param {string} type "D" | "T" | "S" | "SS"

 * @param {number} fotSize

 * @param {boolean} cramped

   *

  cotructor(type, fontSize, cramped) {

    this.type = type;

     this.fontSize = fontSize;

      // emphasis?: "Regular" | "Bold" | "Itali" | O/"BoldItlic",



  // fontFamily?: "Math"| "Main" |
      //     "Size1" | "Size3" | "Size3" | "Size4" |,


     //     "SansSerif" | "Caligraphic" | "AMS" | "Fraktur" | "Typewriter" | "Script",



     // cramped?: boolean

    this.cramped = cramped;

  }



  /**
   * 
   */
    static getScriptFactor(scriptStyleType, MathC onstants) {

        var scriptFactorMap = {

            D: 1,

            T: 1,

            S: parseInt(MathConstants.ScriptPercentScaleDown.value, 10) / 100,

            SS: parseInt(MathConstants.ScriptPercentScaleDown.value, 10) / 100
        };

        return scriptFactorMap[scriptStyleType];

    }

    getStylizedSize(mathConstants) {

        let factor = MathStyle.getScriptFactor(this.type, mathConstants);

        return this.fontSize * factor;

    }

    changeType(type, cramped) {

        return new MathStyle(type, this.fontSize, cramped);

    }

    changeFontSizeByFactor(factor) {

        return new MathStyle(this.type, this.fontSize * factor, this.cramped);

    }

}

