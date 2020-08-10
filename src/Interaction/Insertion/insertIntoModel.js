import { retrieveModelContext } from '../Movement/movement';
import { NodeTable } from '../Tables/nodeTable';
import { getSubItem } from '../Access/access';
import { validate } from '../../React-Components/Document/validate';

/**
 * @param {*} prevState
 * @param {*} keychain
 * @param {*} modelToInsert
 */
export function insertIntoModel(prevState, keychain, modelToInsert) {
  const { parentModel, finalKey } = retrieveModelContext(
    prevState.model,
    keychain
  );
  const node = NodeTable.retrieve(parentModel.type);
  const addKeychain = node.insertAtBoxKey(parentModel, finalKey, modelToInsert);
  updateAlongKeychain(prevState, [...keychain.slice(0, -1), ...addKeychain]);
  // validate(prevState);
}

/**
 * @param {*} prevState
 * @param {*} keychain
 */
export function updateAlongKeychain(prevState, keychain) {
  let currentModel = prevState.model;
  const mutationMap = {};
  mutationMap[currentModel.id] = true;
  for (const key of keychain) {
    currentModel = getSubItem(currentModel, key, false);
    mutationMap[currentModel.id] = true;
  }
  prevState.mutationMap = mutationMap;
}
