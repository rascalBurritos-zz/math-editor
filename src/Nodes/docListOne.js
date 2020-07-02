import AsanaFontData from '../../fonts/AsanaFontData';
import Math_Style from './Types/Math_Style';
import mlOne from './mathListOne.js';
import mlTwo from './mathListTwo.js';

export default {
  type: 'Display',
  rootStyle: new Math_Style('D', 30, false),
  fontData: AsanaFontData,
  rootFormula: mlOne,
};
