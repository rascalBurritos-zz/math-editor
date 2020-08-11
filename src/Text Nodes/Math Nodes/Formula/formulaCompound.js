import {
  CompoundTable,
  NodeTable,
} from '../../../Interaction/Tables/nodeTable';
import { FORMULA_TYPE } from '../../Functional/Node Types';
import {
  getModelIndex,
  sort,
} from '../../Functional/Text Block/TextBlockCompound';
import {
  splice,
  merge,
} from '../../Functional/Vertical List/VerticalListCompound';
import Rectangle from '../../../Abstract/Rectangle';
import { getChildViewsFromId } from '../../Functional/getChildViews';
import Point from '../../../Abstract/Point';
import { getRelativePositionOfBox } from './formulaNode';

CompoundTable.register(FORMULA_TYPE, {
  getModelIndex,
  splice,
  merge,
  sort,
  getSelectionRects,
});

/**
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} leftIndex
 * @param {*} rightIndex
 * @return {Rectangle[]}
 */
function getSelectionRects(viewCollection, id, leftIndex, rightIndex) {
  const childViews = getChildViewsFromId(viewCollection, id);
  console.log(leftIndex, rightIndex);
  const leftPos = getRelativePositionOfBox(
    viewCollection,
    id,
    getModelKeyFromIndex(leftIndex.index)
  );
  const rightPos = getRelativePositionOfBox(
    viewCollection,
    id,
    getModelKeyFromIndex(rightIndex.index)
  );
  const left = leftPos.left;
  const width =
    rightPos.left -
    leftPos.left +
    childViews[rightIndex.index].componentStyle.width;
  const top = 0;
  const height = viewCollection[id].componentStyle.height;
  return [new Rectangle(new Point(top, left), height, width)];

  /**
   * @param {number} index
   * @return {Object}
   */
  function getModelKeyFromIndex(index) {
    return { isCaret: false, index: index * 2 + 1 };
  }
}
