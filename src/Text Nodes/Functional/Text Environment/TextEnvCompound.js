import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_ENV_TYPE } from './TextEnvViewFactory';
import { sort } from '../Text Block/TextBlockCompound';
import {
  merge,
  splice,
  getAdditions,
} from '../Vertical List/VerticalListCompound';
import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';

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
 * @param {*} view
 * @param {*} leftIndexInfo
 * @param {*} rightIndexInfo
 * @return {Rectangle[]}
 */
function getSelectionRects(view, leftIndexInfo, rightIndexInfo) {
  const width = view.metrics.width;
  const height = calculateHeight(
    view,
    leftIndexInfo.index,
    rightIndexInfo.index
  );
  const top = calculateTop(view, leftIndexInfo.index);
  const leftAdditions = getAdditions(leftIndexInfo);
  const rightAdditions = getAdditions(rightIndexInfo);
  const left = 0;
  return [
    ...leftAdditions,
    new Rectangle(new Point(top, left), height, width),
    ...rightAdditions,
  ];

  /**
   * @param {*} view
   * @param {*} leftIndex
   * @return {number}
   */
  function calculateTop(view, leftIndex) {
    return view.elements.slice(0, leftIndex).reduce((acc, curr) => {
      const cs = curr.componentStyle;
      return acc + cs.height + cs.marginBottom;
    }, 0);
  }

  /**
   *
   * @param {*} view
   * @param {*} leftIndex
   * @param {*} rightIndex
   * @return {number}
   */
  function calculateHeight(view, leftIndex, rightIndex) {
    let height = 0;
    for (const element of view.elements.slice(leftIndex, rightIndex + 1)) {
      const cs = element.componentStyle;
      const marginBottom = cs.marginBottom ? cs.marginBottom : 0;
      height += cs.height + marginBottom;
    }
    return height;
  }
}
