import {
  isBound,
  isLeftBound,
  isUpBound,
  isRightBound,
  isDownBound,
  getBoundLeft,
  getBoundRight,
  nextItemGenerator,
} from '../BaseModel';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';

export const VERTICAL_LIST_TYPE = 'Vertical_List';

/**
 * @param {Object} boxKey
 * @return {number}
 */
export function getModelIndex(boxKey) {
  if (isBound(boxKey)) {
    console.warn('invalid model index');
  }
  return boxKey.index;
}
