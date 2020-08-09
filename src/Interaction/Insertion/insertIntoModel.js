import { retrieveModelContext } from '../Movement/movement';
import { NodeTable } from '../Tables/nodeTable';
import { getSubItem } from '../Access/access';
import Identity from '../Util/Identity';

/**
 * @param {*} rootModel
 * @param {*} keychain
 * @param {*} modelToInsert
 */
export function insertIntoModel(rootModel, keychain, modelToInsert) {
  const { parentModel, finalKey } = retrieveModelContext(rootModel, keychain);
  const node = NodeTable.retrieve(parentModel.type);
  node.insertAtBoxKey(parentModel, finalKey, modelToInsert);
  // updateAlongKeychain(rootModel, keychain.slice(0, -1));
}

/**
 * @param {*} model
 * @param {*} keychain
 */
function updateAlongKeychain(model, keychain) {
  let currentModel = model;
  currentModel.id = Identity.getNextId();
  for (const key of keychain) {
    currentModel = getSubItem(currentModel, key, false);
    currentModel.id = Identity.getNextId();
  }
}
