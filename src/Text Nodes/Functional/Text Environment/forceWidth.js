import { ParserTable, NodeTable } from '../../../Interaction/Tables/nodeTable';
import linebreak from './linebreak';
import Identity from '../../../Interaction/Util/Identity';
import { TEXT_LINE_TYPE } from '../Node Types';

/**
 * @param {Object} model
 * @return {Object}
 */
export default function forceWidth(model, chainA, chainB) {
  // model lines -> model words -> view words ->
  // word widths -> lines ->
  const node = NodeTable.retrieve(model.type);
  const lines = node.getElements(model);
  const words = getWords(lines);
  const lineArray = linebreak(words, model.width);
  model.elements = lineArrayToEnvElements(lineArray);
  return model;

  /**
   *@param {Array} lineArray
   *@return {Array}
   */
  function lineArrayToEnvElements(lineArray) {
    const textLines = [];
    for (let i = 0; i < lineArray.length; i++) {
      textLines.push(lineToTextLine(lineArray[i]));
    }
    return textLines;
  }

  /**
   *
   * @param {Array} line
   * @return {Object} line
   */
  function lineToTextLine(line) {
    return {
      id: Identity.getNextId(),
      type: TEXT_LINE_TYPE,
      elements: line,
    };
  }

  /**
   * @param {Array} lines
   * @return {Array}
   */
  function getWords(lines) {
    const words = [];
    for (const line of lines) {
      const lineNode = NodeTable.retrieve(line.type);
      const lineElements = lineNode.getElements(line);
      for (const block of lineElements) {
        const parser = ParserTable.retrieve(block.type);
        words.push(...parser.wordify(block));
      }
    }
    return words;
  }
}
