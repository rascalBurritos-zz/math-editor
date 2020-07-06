import AsanaFontData from '../../fonts/AsanaFontData';
import Math_Style from './Types/Math_Style';
import mlOne from './mathListOne.js';
import mlTwo from './mathListTwo.js';

export default {
  type: 'Vertical_List',
  baselineDistance: 20,
  baselineBump: 10,
  elements: [
    {
      type: 'Display',
      rootStyle: new Math_Style('D', 30, false),
      fontData: AsanaFontData,
      rootFormula: mlOne,
    },
    {
      type: 'Text',
      block: {
        fontSize: 30,
        fontData: AsanaFontData,
        content: 'sexy body, she shows it \\\\  Loves the drama she chose it',
      },
    },
    {
      type: 'Text',
      block: {
        fontSize: 30,
        fontData: AsanaFontData,
        content: 'The quick brown fox jumped over the lazy dog',
      },
    },
    {
      type: 'Display',
      rootStyle: new Math_Style('D', 30, false),
      fontData: AsanaFontData,
      rootFormula: mlTwo,
    },
  ],
};
