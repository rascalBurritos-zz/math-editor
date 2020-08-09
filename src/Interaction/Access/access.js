export const ACCESS_TYPE = { VIEW: 'View', MODEL: 'Model', BOTH: 'Both' };

export const AccessContainer = {
  _modelPool: {},
  _viewPool: {},
  register: (type, accessFunction, accessType) => {
    if (accessType === ACCESS_TYPE.VIEW) {
      AccessContainer._viewPool[type] = accessFunction;
    } else if (accessType === ACCESS_TYPE.MODEL) {
      AccessContainer._modelPool[type] = accessFunction;
    } else {
      AccessContainer._viewPool[type] = accessFunction;
      AccessContainer._modelPool[type] = accessFunction;
    }
  },
  retrieve: (type, isView) => {
    if (isView) {
      return AccessContainer._viewPool[type];
    } else {
      return AccessContainer._modelPool[type];
    }
  },
};

/**
 * @param {Object} item
 * @param {Array} keychain
 * @param {Object} viewCollection
 * @return {Object}
 */
export function traverse(item, keychain, viewCollection = false) {
  const p = keychain.reduce((submodel, boxKey) => {
    return getSubItem(submodel, boxKey, viewCollection);
  }, item);
  return p;
}
/**
 * @param {Object} item
 * @param {Object} boxKey
 * @param {Object} viewCollection
 * @return {Object}
 */
export function getSubItem(item, boxKey, viewCollection = false) {
  const isView = Boolean(viewCollection);
  const accessFunc = AccessContainer.retrieve(item.type, isView);
  return accessFunc(item, boxKey, viewCollection);
}
