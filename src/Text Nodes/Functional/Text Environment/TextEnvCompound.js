import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_ENV_TYPE } from './TextEnvViewFactory';
import {
  sort,
  getModelIndex,
  getInsertIndex,
} from '../Text Block/TextBlockCompound';
import { merge, splice } from '../Vertical List/VerticalListCompound';

const getElements = (item) => item.elements;

CompoundTable.register(TEXT_ENV_TYPE, {
  getInsertIndex,
  getModelIndex,
  getSelectionRects,
  splice,
  merge,
  getElements,
  sort,
});

/**
 * @return {Rectangle[]}
 */
function getSelectionRects() {
  return [];
}
