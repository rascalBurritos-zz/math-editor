/**
 * @param {Object} parent
 * @param {String} parentElementAccess
 * @param {number} insertIndex
 * @param {Object} modelToInsert
 */
export default function insertFromCompoundModels(
  parent,
  parentElementAccess,
  insertIndex,
  modelToInsert
) {
  const group = parent[parentElementAccess];
  if (Array.isArray(group)) {
    group.splice(insertIndex, modelToInsert);
  } else if (typeof group === 'string') {
    const newContent =
      group.slice(0, insertIndex) + modelToInsert + group.slice(insertIndex);
    parent[parentElementAccess] = newContent;
  } else {
    console.log('bad insert');
  }
}
