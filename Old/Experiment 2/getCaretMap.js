import VerticalListCaretMap from './VerticalListCaretMap';
import TextBlockCaretMap from './TextBlockCaretMap';
import getAccessMap from './getAccessMap';
/** @typedef {import('./CaretMap').default} CaretMap  */

/**
 *
 * @param {Object} item
 * @param {boolean} isView
 * @return {Object} caretMap
 */
export default function getCaretMap(item, isView) {
  const info = generateInfo(item, item.type, isView);
  const typeMap = {
    Vertical_List: VerticalListCaretMap,
    Text_Block: TextBlockCaretMap,
  };
  return new typeMap[item.type](info);
}

/**
 * @param {Object} item
 * @param {String} type
 * @param {boolean} isView
 * @return {Object}
 */
function generateInfo(item, type, isView) {
  const infoMap = {
    Vertical_List: verticalListInfo,
    Text_Block: textBlockInfo,
  };
  return infoMap[type](item);
  /**
   * @param {Object} item
   * @return {Object}
   */
  function verticalListInfo(item) {
    const accessor = getAccessMap(type, isView);
    return { numElements: item[accessor].length };
  }
  /**
   * @param {Object} item
   * @return {Object}
   */
  function textBlockInfo(item) {
    const accessor = getAccessMap(type, isView);
    return { numElements: item[accessor].length };
  }
}
