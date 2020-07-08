/**
 * @param {Object} caretNode
 * @return {Array}
 */
export default function moveLeft(caretNode) {
  return caretNode.left;
  // const currentCaretIndex = indices.slice(-1)[0];
  // // should this function of the final branch decide what is left
  // // are all indices stored as arrays? YES , therefore i can do it
  // // because every index is an number
  // const desiredCaretIndex = currentCaretIndex - 1;
  // const finalBranch = getNodeAt(root, indices.slice(0, -1));
  // // ask the final branch if if that is a valid move,
  // // return either Left Valid Right, indicating which bound it passed
  // // or if it is good to go
  // const caretStatus = finalBranch.isValidCaretPos(desiredCaretIndex);
  // if (caretStatus === CaretStatus.Valid) {
  //   const shiftedIndices = indices.slice(0, -1);
  //   shiftedIndices.push(desiredCaretIndex);
  //   return shiftedIndices;
  // } else if (finalBranch === root) {
  //   console.log('Leftmost Position Reached');
  // } else {
  //   // ask parent of final branch what is left of this node
  //   // because it has reached the end of the final branch
  //   const parentIndices = indices.slice(0, -2);
  //   const parentFinal = getNodeAt(root, parentIndices);
  //   const resultantCaretIndex = parentFinal.getIndexLeftOf(finalBranch);
  //   return [...parentIndices, resultantCaretIndex];
  // }

  // /**
  //  * @param {Object} node
  //  * @param {Array} indices
  //  * @return {Object}
  //  */
  // function getNodeAt(node, indices) {
  //   return indices.reduce((acc, curr) => {
  //     return acc.elements[curr];
  //   }, node);
  // }
}
