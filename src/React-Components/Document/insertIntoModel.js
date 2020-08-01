import insertFromCompoundModels from '../insertFromCompoundModels';
import { retrieveModelContext } from '../../Interaction/Movement/movement';

/**
 *
 * @param {Array} keychain must have caret at end
 * @param {*} rootModel
 * @param {*} modelToInsert
 * @return {Object} new model
 */
export default function insertIntoModel(keychain, rootModel, modelToInsert) {
  const parentKeychain = keychain.slice(0, -1);
  const parent = traverse(rootModel, parentKeychain, false);
  const compounds = ['Vertical_List', 'Text_Block', 'Formula'];
  const parentCaretMap = getCaretMap(parent, false);
  const insertIndex = parentCaretMap.getInsertIndex(
    keychain[keychain.length - 1]
  );
  if (compounds.includes(parent.type)) {
    const parentElementAccess = getAccessMap(parent.type, false);
    insertFromCompoundModels(
      parent,
      parentElementAccess,
      insertIndex,
      modelToInsert
    );
    return rootModel;
  } else {
    console.log('NON COMPOUND CARET CONTAINER?');
    return;
  }
}

/**
 *
 * @param {*} keychain
 * @param {*} rootModel
 * @param {*} modelToInsert
 */
function insert(keychain, rootModel, modelToInsert) {
  const { parentKeyChain, parent, caretMap, finalKey } = retrieveModelContext(
    rootModel,
    keychain
  );
  const leftIndex = caretMap.getInsertIndex(finalKey);
  const magicBox = {};
  magicBox.splice(parent, leftIndex, 0, modelToInsert);
}
