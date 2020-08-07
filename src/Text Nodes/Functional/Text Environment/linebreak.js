// import { ParserTable } from '../../../Interaction/Tables/nodeTable';

/**
 * @param {*} words
 * @param {*} desiredWidth
 * @return {Array}
 */
export default function linebreak(words, desiredWidth) {
  const lines = [];
  let currentLine = [];
  let progress = 0;
  for (let i = 0; i < words.length; i++) {
    currentLine.push(words[i].model);
    progress += words[i].width;
    if (progress > desiredWidth) {
      lines.push(currentLine);
      progress = 0;
      currentLine = [];
    }
  }
  return lines;
}

// /**
//  * @param {*} blocks models
//  * @return {Array}
//  */
// export function blocksToWords(blocks) {
//   return blocks
//     .map((block) => {
//       const parser = ParseTable.retrieve(block.type);
//       return parser.wordify(block);
//     })
//     .flat(1);
// }
