import docListOne from '../../Test/docListOne';

/**
 * @return {Object} document state
 */
export default function documentStartup() {
  // vertical list -> textblock -> textGlyph
  // const starterKeychain = [['elementBehaviors', 0], { index: 3 }];
  const starterKeychain = [{ rungIndex: 1, onLeft: true }];
  return { model: docListOne, caretKeychain: starterKeychain };
}
