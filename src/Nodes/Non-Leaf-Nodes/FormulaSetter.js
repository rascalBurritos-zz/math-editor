import Typesetter from "./Typesetter";
import interElementSpacingTable from "TBD"
export default class Formula_Setter extends Typesetter {
    constructor(setSpec) {
        super(setSpec)
    }

    /**
    * @param {SpacingStyle[]} spacingStyleArray
    **/
    calculateInterElementSpacing(spacingStyleArray){
        return spacingStyleArray.map((style)=>{
            interElementSpacingTable[style]
        })
    }
}
