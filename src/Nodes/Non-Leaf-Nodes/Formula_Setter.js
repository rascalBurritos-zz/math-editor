import Typesetter from "../Abstract/Typesetter.js";
// import interElementSpacingTable from "TBD"
export default class Formula_Setter extends Typesetter {
    constructor(setSpec) {
        super(setSpec)
    }

    /**
    * @param {SpacingStyle[]} spacingStyleArray
    **/
    calculateInterElementSpacing(spacingStyleArray) {
        return [69];
        // return spacingStyleArray.map((style) => {
        //     interElementSpacingTable[style]
        // })
    }
}
