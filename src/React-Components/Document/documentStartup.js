import docListOne from '../../Test/docListOne';
import '../../Test/nodeImports';
import { getSubItem } from '../../Interaction/Access/access';
import forceWidth from '../../Text Nodes/Functional/Text Environment/forceWidth';
import { findModelById } from '../../Interaction/Insertion/findModelbyId';
import { validate } from './validate';
/**
 * @return {Object} document state
 */
export default function documentStartup() {
  // vertical list -> textblock -> textGlyph
  const starterKeychain = [
    { isCaret: false, index: 0 },
    { isCaret: false, index: 0 },
    { isCaret: true, index: 0 },
  ];
  const selection = { anchor: starterKeychain, focus: starterKeychain };

  const environments = [docListOne.elements[0].id];
  // validate(docListOne, environments);
  return { model: docListOne, selection, mutationMap: {}, environments };
}
