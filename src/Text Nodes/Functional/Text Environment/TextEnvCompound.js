import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { sort } from '../Text Block/TextBlockCompound';
import {
  merge,
  splice,
  getAdditions,
} from '../Vertical List/VerticalListCompound';
import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { TEXT_ENV_TYPE } from '../Node Types';
import { getChildViewsFromId } from '../getChildViews';

CompoundTable.register(TEXT_ENV_TYPE, {
  getModelIndex,
  getSelectionRects,
  splice,
  merge,
  sort,
});

/**
 * @param {*} boxKey
 * @return {number}
 */
function getModelIndex(boxKey) {
  return boxKey.index;
}

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} leftIndexInfo
 * @param {*} rightIndexInfo
 * @return {Rectangle[]}
 */
function getSelectionRects(viewCollection, id, leftIndexInfo, rightIndexInfo) {
  const width = viewCollection[id].metrics.width;
  const elements = getChildViewsFromId(viewCollection, id);
  const height = calculateHeight(
    elements,
    leftIndexInfo.index,
    rightIndexInfo.index
  );
  const top = calculateTop(elements, leftIndexInfo.index);
  const leftAdditions = getAdditions(leftIndexInfo);
  const rightAdditions = getAdditions(rightIndexInfo);
  const left = 0;
  return [
    ...leftAdditions,
    new Rectangle(new Point(top, left), height, width),
    ...rightAdditions,
  ];

  /**
   * @param {*} elements
   * @param {*} leftIndex
   * @return {number}
   */
  function calculateTop(elements, leftIndex) {
    return elements.slice(0, leftIndex).reduce((acc, curr) => {
      const cs = curr.componentStyle;
      return acc + cs.height + cs.marginBottom;
    }, 0);
  }

  /**
   *
   * @param {*} elements
   * @param {*} leftIndex
   * @param {*} rightIndex
   * @return {number}
   */
  function calculateHeight(elements, leftIndex, rightIndex) {
    let height = 0;
    for (const element of elements.slice(leftIndex, rightIndex + 1)) {
      const cs = element.componentStyle;
      const marginBottom = cs.marginBottom ? cs.marginBottom : 0;
      height += cs.height + marginBottom;
    }
    return height;
  }
}
