import { RadicalComponentData } from "../src/ComponentData/RadicalComponentData.js";
import { fontFactory } from "../src/Font/FontFactory.js";
import AsanaFontTables from "../fonts/AsanaFontData.js";

test("radical constants", () => {
    let mathSpec = { fontData: fontFactory(AsanaFontTables) };
    let r = new RadicalComponentData(mathSpec);
    expect(r.getConstants()).toBe({
        degreeBottomRaisePercent: 65,
        displayVerticalGap: 174,
        extraAscender: 59,
        kernAfterDegree: -556,
        kernBeforeDegree: 278,
        ruleThickness: 59,
        verticalGap: 74
    });
});
