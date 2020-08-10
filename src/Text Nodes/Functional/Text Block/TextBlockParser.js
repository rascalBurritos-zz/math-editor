import textBlockViewFactory from './textBlockViewFactory';
import { ParserTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_BLOCK_TYPE } from '../Node Types';
import { ViewMaster } from '../ViewMaster';
import Identity from '../../../Interaction/Util/Identity';

ParserTable.register(TEXT_BLOCK_TYPE, { wordify });

/**
 * @param {*} textModel
 * @return {Array}
 */
function wordify(textModel) {
  const content = textModel.content;
  const words = [];
  let currentWord = [];
  for (let i = 0; i < content.length; i++) {
    currentWord.push(content[i]);
    if (content[i].unicode === '32') {
      words.push(currentWord);
      currentWord = [];
    }
  }
  if (currentWord.length > 0) {
    words.push(currentWord);
  }
  return words.map((word) => {
    const model = {
      id: Identity.getNextId(),
      type: TEXT_BLOCK_TYPE,
      content: word,
      fontSize: textModel.fontSize,
      fontName: textModel.fontName,
    };
    const vm = new ViewMaster(model);
    const rootId = vm.rootId;
    const viewCollection = vm.viewCollection;
    const width = viewCollection[rootId].metrics.width;
    return { model, width };
  });
}
