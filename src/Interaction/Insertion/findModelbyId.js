import { NodeTable } from '../Tables/nodeTable';

/**
 * @param {*} model
 * @param {*} id
 * @return {Object}
 */
export function findModelById(model, id) {
  if (model.id === id) {
    return model;
  }
  const node = NodeTable.retrieve(model.type);
  if ('getElements' in node) {
    const elements = node.getElements(model);
    for (let i = 0; i < elements.length; i++) {
      const result = findModelById(elements[i], id);
      if (result) {
        return result;
      }
    }
  } else {
    return false;
  }
}
