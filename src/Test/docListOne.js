import Math_Style from '../Math Nodes/Types/Math_Style';
import mlOne from './mathListOne.js';
import mlTwo from './mathListTwo.js';
import { VERTICAL_LIST_TYPE } from '../Text Nodes/Functional/Vertical List/VerticalListViewFactory';
import { TEXT_BLOCK_TYPE } from '../Text Nodes/Functional/Text Block/TextBlockNode';

export default {
  type: VERTICAL_LIST_TYPE,
  baselineDistance: 20,
  baselineBump: 10,
  elements: [
    // {
    //   type: 'Display',
    //   rootStyle: new Math_Style('D', 30, false),
    //   fontData: AsanaFontData,
    //   rootFormula: mlOne,
    // },
    {
      type: TEXT_BLOCK_TYPE,
      fontSize: 30,
      fontName: 'Asana',
      content: "I'm minding my own damn business",
    },
    {
      type: TEXT_BLOCK_TYPE,
      fontSize: 30,
      fontName: 'Asana',
      content: "Don't try to find me",
    },
    {
      type: TEXT_BLOCK_TYPE,
      fontSize: 30,
      fontName: 'Asana',
      content: "I'm better left alone than in this",
    },
    // {
    //   type: 'Display',
    //   rootStyle: new Math_Style('D', 30, false),
    //   fontData: AsanaFontData,
    //   rootFormula: mlTwo,
    // },
  ],
};
