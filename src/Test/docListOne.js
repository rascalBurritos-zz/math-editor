import Math_Style from '../Math Nodes/Types/Math_Style';
// import mlOne from './mathListOne.js';
// import mlTwo from './mathListTwo.js';
// import forceWidth from '../Text Nodes/Functional/Text Environment/forceWidth';
import './nodeImports';
import {
  VERTICAL_LIST_TYPE,
  TEXT_LINE_TYPE,
  TEXT_ENV_TYPE,
  TEXT_BLOCK_TYPE,
} from '../Text Nodes/Functional/Node Types';
import Identity from '../Interaction/Util/Identity';
import { stringToContent } from '../Interaction/Util/stringToContent';

export default {
  type: VERTICAL_LIST_TYPE,
  id: Identity.getNextId(),
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
      id: Identity.getNextId(),
      baselineDistance: 20,
      baselineBump: 10,
      width: 300,
      elements: [
        {
          type: TEXT_LINE_TYPE,
          id: Identity.getNextId(),
          elements: [
            {
              type: TEXT_BLOCK_TYPE,
              id: Identity.getNextId(),
              fontSize: 30,
              fontName: 'Asana',
              content: stringToContent(
                'This quick brown fox jumped over the lazy dog'
                // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business"
              ),
            },
          ],
        },
        {
          type: TEXT_LINE_TYPE,
          id: Identity.getNextId(),
          elements: [
            {
              type: TEXT_BLOCK_TYPE,
              id: Identity.getNextId(),
              fontSize: 12,
              fontName: 'Asana',
              content: stringToContent('ILorem ipsum dolor sit amet'),
            },
          ],
        },
        {
          type: TEXT_LINE_TYPE,
          id: Identity.getNextId(),
          elements: [
            {
              type: TEXT_BLOCK_TYPE,
              id: Identity.getNextId(),
              fontSize: 20,
              fontName: 'Asana',
              content: stringToContent("I'm"),
              // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
            },
            {
              type: TEXT_BLOCK_TYPE,
              id: Identity.getNextId(),
              fontSize: 45,
              fontName: 'Asana',
              content: stringToContent('UPSET '),
              // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
            },
            {
              type: TEXT_BLOCK_TYPE,
              id: Identity.getNextId(),
              fontSize: 20,
              fontName: 'Asana',
              content: stringToContent('50,000'),
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
