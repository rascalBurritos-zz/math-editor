import docListOne from '../../Test/docListOne';

/**
 * @return {Object} document state
 */
export default function documentStartup() {
  // vertical list -> textblock -> textGlyph
  const starterKeychain = [
    {
      isCaret: false,
      index: 1,
      modelAccess: ['elements', 1],
      viewAccess: ['elementBehaviors', 1],
    },
    { isCaret: true, index: 0 },
  ];
  // const starterKeychain = [['elementBehaviors',]];
  return { model: docListOne, caretKeychain: starterKeychain };
}
