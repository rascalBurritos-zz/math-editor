export function constructExtendedGlyph(
    unicode,
    desiredSize,
    fontSize,
    direction,
    fontDataVariants,
    upm,
    glyphNameToUnicode,
    minConnectorOverlap
) {
    var variantMap,
        pxpfu = fontSize / upm;
    if (direction === "vertical") {
        variantMap = fontDataVariants.vertical;
    } else if (direction === "horizontal") {
        variantMap = fontDataVariants.horizontal;
    }

    var partRecords = variantMap[unicode].GlyphAssembly.PartRecords;
    var currentPartRecords = partRecords.filter(ele => {
        return ele.PartFlags.value === "0";
    });

    var totalHeight = 0;
    currentPartRecords.forEach(ele => {
        totalHeight += parseInt(ele.FullAdvance.value);
    });
    var minTotalHeight,
        maxTotalHeight,
        maxOverlapArray = [],
        minOverlapArray = [],
        desiredSizeFU = desiredSize / pxpfu;

    minTotalHeight = maxTotalHeight = totalHeight;
    for (var i = 1; i < currentPartRecords.length; i++) {
        let startConnector = parseInt(
            currentPartRecords[i].StartConnectorLength.value,
            10
        );
        let endConnector = parseInt(
            currentPartRecords[i - 1].EndConnectorLength.value,
            10
        );
        let maxOverlap = Math.max(startConnector, endConnector);
        maxOverlapArray.push(maxOverlap);
        let minOverlap =
            minConnectorOverlap > maxOverlap ? maxOverlap : minConnectorOverlap;
        minOverlapArray.push(minOverlap);
        minTotalHeight -= maxOverlap;
        maxTotalHeight -= minOverlap;
    }
    if (minTotalHeight > desiredSizeFU) {
        let unicodeArray = partRecordsToUnicode(
            currentPartRecords,
            glyphNameToUnicode
        );
        let overlapArray = [];
        maxOverlapArray.forEach(ele => {
            overlapArray.push(ele * pxpfu);
        });
        return { unicodeArray, overlapArray };
    }
    if(maxTotalHeight > desiredSizeFU){
        let unicodeArray = partRecordsToUnicode(currentPartRecords,glyphNameToUnicode)
        let numberOfAdjacentPairs = maxOverlapArray.length;
        let shrinkAmount = (maxTotalHeight -desiredSizeFU)/numberOfAdjacentPairs
        let overlapArray = [];
        maxOverlapArray.forEach(ele =>{
            overlapArray.push((ele-shrinkAmount)*pxpfu)
        })
        return{unicodeArray,overlapArray}
    }
    var intermediatePartRecords = [];
    currentPartRecords.forEach((ele)=>{
        if(ele.PartFlags.value === '1'){
//adding one of every extender
        }
    })
}
function partRecordsToUnicode(currentPartRecords, glyphNameToUnicode) {
    var unicodeArray = [];
    currentPartRecords.forEach(ele => {
        let unicode = glyphNameToUnicode[ele.glyph.value];
        unicodeArray.push(unicode);
    });
    return unicodeArray;
}
