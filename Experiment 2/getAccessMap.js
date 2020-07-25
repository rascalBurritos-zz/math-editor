/**
 * @param {String} type
 * @param {boolean} isView
 * @return {String} access string
 */
export default function getAccessMap(type, isView) {
  const typeMap = {
    Vertical_List: ['elementBehaviors', 'elements'],
    Text_Block: ['elementBehaviors', 'content'],
  };
  const index = isView ? 0 : 1;
  return typeMap[type][index];
}
