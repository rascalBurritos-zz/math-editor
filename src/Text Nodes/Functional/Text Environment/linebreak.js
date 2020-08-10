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
    progress += words[i].width;
    if (progress > desiredWidth) {
      lines.push(currentLine);
      currentLine = [words[i].model];
      progress = 0;
    } else {
      currentLine.push(words[i].model);
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
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
