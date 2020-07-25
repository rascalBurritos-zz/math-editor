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
    },
    { isCaret: true, index: 0 },
  ];
  const selection = { anchor: starterKeychain, focus: starterKeychain };
  return { model: docListOne, selection };
}
