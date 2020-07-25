/**
 *
 * @param {*} groupA
 * @param {*} groupB
 * @return {*}
 */
export function joinAlikeCompoundModels(groupA, groupB) {
  if (Array.isArray(groupA)) {
    return [...groupA, ...groupB];
  } else if (typeof groupA === 'string') {
    return groupA + groupB;
  }
}

/**
 * @param {*} model
 * @param {*} accessor
 * @param {*} index
 * @param {*} deleteCount
 */
export default function removeFromCompoundModels(
  model,
  accessor,
  index,
  deleteCount
) {
  const removeFunctionMap = {
    Vertical_List: deleteFromArray,
    Text_Block: deleteFromString,
  };
  model[accessor] = removeFunctionMap[model.type](
    model[accessor],
    index,
    deleteCount
  );

  /**
   *
   * @param {*} arr
   * @param {*} start
   * @param {*} amount
   * @return {Array}
   */
  function deleteFromArray(arr, start, amount) {
    return [...arr.slice(0, start), ...arr.slice(start + amount)];
  }

  /**
   *
   * @param {String} str
   * @param {number} start
   * @param {number} amount
   * @return {String}
   */
  function deleteFromString(str, start, amount) {
    return str.slice(0, start) + str.slice(start + amount);
  }
}
