import getAccessMap from './getAccessMap';
import getCaretMap from './getCaretMap';

/**
 * @param {Object} boxKey
 * @param {Object} item
 * @param {boolean} isView
 * @return {Object}
 */
export default function getSubItem(boxKey, item, isView) {
  const accessor = getAccessMap(item.type, isView);
  const compounds = ['Vertical_List', 'Text_Block', 'Formula'];
  if (compounds.includes(item.type)) {
    const caretMap = getCaretMap(item, isView);
    const index = caretMap.getModelIndex(boxKey);
    return item[accessor][index];
  } else {
    return item[accessor];
  }
}
