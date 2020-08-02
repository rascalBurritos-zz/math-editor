import { retrieveModelContext } from '../Movement/movement';
import { CompoundTable } from '../Tables/nodeTable';
import { dangerousSetParent } from '../Access/getCommon';

/**
 * @param {*} rootModel
 * @param {*} keychain
 * @param {*} modelToInsert
 */
export function insertIntoModel(rootModel, keychain, modelToInsert) {
  const { parentKeyChain, parentModel, finalKey } = retrieveModelContext(
    rootModel,
    keychain
  );
  const compound = CompoundTable.retrieve(parentModel.type);
  const leftIndex = compound.getInsertIndex(finalKey);
  const child = compound.splice(parentModel, leftIndex, 0, modelToInsert);
  dangerousSetParent(rootModel, parentKeyChain, child);
}
