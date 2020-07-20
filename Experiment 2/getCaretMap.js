import VerticalListCaretMap from './VerticalListCaretMap';
import TextBlockCaretMap from './TextBlockCaretMap';

/**
 *
 * @param {Object} model
 * @return {Object} caretMap
 */
export default function getCaretMap(model) {
  const typeMap = {
    Vertical_List: VerticalListCaretMap,
    Text_Block: TextBlockCaretMap,
  };
  return new typeMap[model.type](model);
}
