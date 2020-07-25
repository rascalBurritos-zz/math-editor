import AsanaFontData from '../../../fonts/AsanaFontData';

/**
 *
 * @param {String} fontName
 * @return {Object} font object
 */
export default function fontMapper(fontName) {
  const map = {
    Asana: AsanaFontData,
  };
  return map[fontName];
}
