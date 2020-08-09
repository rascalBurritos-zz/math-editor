/**
 * @param {*} viewCollection
 * @param {*} parentId
 * @return {Array}
 */
export function getChildViewsFromId(viewCollection, parentId) {
  if ('childIds' in viewCollection[parentId]) {
    const childViews = [];
    for (let i = 0; i < viewCollection[parentId].childIds.length; i++) {
      const childId = viewCollection[parentId].childIds[i];
      childViews.push(viewCollection[childId]);
    }
    return childViews;
  } else {
    console.log('no childIds');
  }
}
