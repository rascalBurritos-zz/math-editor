import {
  ParserTable,
  CompoundTable,
} from '../../../Interaction/Tables/nodeTable';
import linebreak from './linebreak';
import { DangerousSetContainer } from '../../../Interaction/Removal/dangerousSetContainer';

/**
 * @param {Object} model
 * @return {Object}
 */
export default function forceWidth(model) {
  // model lines -> model words -> view words ->
  // word widths -> lines ->
  const compound = CompoundTable.retrieve(model.type);
  const lines = compound.getElements(model, false);
  const words = getWords(lines);
  const lineArray = linebreak(words, model.width);

  const dangerouseSet = DangerousSetContainer.retrieve(model.type);

  model.lines = lineArray;
  return model;

  /**
   * @param {Array} lines
   * @return {Array}
   */
  function getWords(lines) {
    const words = [];
    for (const line of lines) {
      for (const block of line) {
        const parser = ParserTable.retrieve(block.type);
        words.push(...parser.wordify(block));
      }
    }
    return words;
  }
}
