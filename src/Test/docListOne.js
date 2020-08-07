import Math_Style from '../Math Nodes/Types/Math_Style';
// import mlOne from './mathListOne.js';
// import mlTwo from './mathListTwo.js';
import { VERTICAL_LIST_TYPE } from '../Text Nodes/Functional/Vertical List/VerticalListViewFactory';
import { TEXT_BLOCK_TYPE } from '../Text Nodes/Functional/Text Block/textBlockViewFactory';
import { TEXT_ENV_TYPE } from '../Text Nodes/Functional/Text Environment/TextEnvViewFactory';
// import forceWidth from '../Text Nodes/Functional/Text Environment/forceWidth';
import './nodeImports';
import { TEXT_LINE_TYPE } from '../Text Nodes/Functional/Text Line/TextLineViewFactory';

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
      type: TEXT_ENV_TYPE,
      baselineDistance: 20,
      baselineBump: 10,
      width: 800,
      elements: [
        {
          type: TEXT_LINE_TYPE,
          elements: [
            {
              type: TEXT_BLOCK_TYPE,
              fontSize: 30,
              fontName: 'Asana',
              content: 'This quick brown fox jumped over the lazy dog',
              // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
            },
          ],
        },
        {
          type: TEXT_LINE_TYPE,
          elements: [
            {
              type: TEXT_BLOCK_TYPE,
              fontSize: 12,
              fontName: 'Asana',
              content: 'ILorem ipsum dolor sit amet',
            },
          ],
        },
        {
          type: TEXT_LINE_TYPE,
          elements: [
            {
              type: TEXT_BLOCK_TYPE,
              fontSize: 20,
              fontName: 'Asana',
              content: "I'm",
              // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
            },
            {
              type: TEXT_BLOCK_TYPE,
              fontSize: 45,
              fontName: 'Asana',
              content: 'UPSET ',
              // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
            },
            {
              type: TEXT_BLOCK_TYPE,
              fontSize: 20,
              fontName: 'Asana',
              content: '50,000',
              // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
            },
          ],
        },
      ],
    },
    // {
    //   type: 'Display',
    //   rootStyle: new Math_Style('D', 30, false),
    //   fontData: AsanaFontData,
    //   rootFormula: mlTwo,
    // },
  ],
};