import textBlockViewFactory, { TEXT_BLOCK_TYPE } from './textBlockViewFactory';
import { ParserTable } from '../../../Interaction/Tables/nodeTable';

ParserTable.register(TEXT_BLOCK_TYPE, { wordify });

/**
 * @param {*} textModel
 * @return {Array}
 */
function wordify(textModel) {
  return textModel.content.split(' ').map((word) => {
    const model = {
      type: TEXT_BLOCK_TYPE,
      content: word + ' ',
      fontSize: textModel.fontSize,
      fontName: textModel.fontName,
    };
    const width = textBlockViewFactory(model).metrics.width;
    return {
      model,
      width,
    };
  });
}
