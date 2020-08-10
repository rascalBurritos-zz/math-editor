import forceWidth from '../../Text Nodes/Functional/Text Environment/forceWidth';
import { findModelById } from '../../Interaction/Insertion/findModelbyId';
import { getSubItem } from '../../Interaction/Access/access';
/**
 * @param {*} prevState
 */
export function validate(prevState) {
  const focusModelArray = getModelsOfKeychain(
    prevState.model,
    prevState.selection.focus.slice(0, -1)
  );
  const anchorModelArray = getModelsOfKeychain(
    prevState.model,
    prevState.selection.focus.slice(0, -1)
  );
  for (let i = 0; i < prevState.environments.length; i++) {
    const targetModel = findModelById(
      prevState.model,
      prevState.environments[i]
    );
    let focusChain = false;
    if (focusModelArray.includes(targetModel)) {
    }
    let anchorChain = false;
    if (anchorModelArray.includes(targetModel)) {
    }
    forceWidth(targetModel, focusChain, anchorChain);
  }
}

/**
 *
 * @param {*} model
 * @param {*} keychain
 */
function getModelsOfKeychain(model, keychain) {
  let currentModel = model;
  const modelChain = [currentModel];
  for (let i = 0; i < keychain.length; i++) {
    currentModel = getSubItem(currentModel, keychain[i]);
    modelChain.push(currentModel);
  }
  return modelChain;
}
