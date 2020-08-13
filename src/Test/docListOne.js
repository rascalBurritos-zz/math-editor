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
  DISPLAY_ENV_TYPE,
  FORMULA_TYPE,
  MATH_GLYPH_TYPE,
  FRACTION_TYPE,
  SCRIPTS_TYPE,
} from '../Text Nodes/Functional/Node Types';
import Identity from '../Interaction/Util/Identity';
import { stringToContent } from '../Interaction/Util/stringToContent';
import Spacing_Style from '../Math Nodes/Types/Spacing_Style';

export default {
  type: VERTICAL_LIST_TYPE,
  id: Identity.getNextId(),
  baselineDistance: 20,
  baselineBump: 10,
  elements: [
    {
      type: DISPLAY_ENV_TYPE,
      id: Identity.getNextId(),
      rootStyle: new Math_Style('D', 30, false),
      fontName: 'Asana',
      rootFormula: {
        type: FORMULA_TYPE,
        id: Identity.getNextId(),
        elements: [
          {
            type: MATH_GLYPH_TYPE,
            id: -1,
            // unicode: '∫'.codePointAt(0).toString(),
            unicode: '𝑥'.codePointAt(0).toString(),
            spacingStyle: Spacing_Style.Ordinary,
          },
          {
            type: SCRIPTS_TYPE,
            id: Identity.getNextId(),
            nucleusId: -1,
            superscript: {
              type: MATH_GLYPH_TYPE,
              id: Identity.getNextId(),
              unicode: '50',
              spacingStyle: Spacing_Style.Ordinary,
            },
            subscript: {
              type: MATH_GLYPH_TYPE,
              id: Identity.getNextId(),
              unicode: '56',
              spacingStyle: Spacing_Style.Ordinary,
            },
          },
          {
            type: MATH_GLYPH_TYPE,
            id: Identity.getNextId(),
            unicode: '120',
            spacingStyle: Spacing_Style.Binary,
          },
          {
            type: MATH_GLYPH_TYPE,
            id: Identity.getNextId(),
            unicode: '121',
            spacingStyle: Spacing_Style.Ordinary,
          },
          {
            type: FRACTION_TYPE,
            id: -2,
            numerator: {
              type: FORMULA_TYPE,
              id: Identity.getNextId(),
              elements: [
                {
                  id: Identity.getNextId(),
                  type: MATH_GLYPH_TYPE,
                  spacingStyle: Spacing_Style.Ordinary,
                  unicode: '98',
                },
              ],
            },
            denominator: {
              type: FORMULA_TYPE,
              id: Identity.getNextId(),
              elements: [
                {
                  id: Identity.getNextId(),
                  type: MATH_GLYPH_TYPE,
                  spacingStyle: Spacing_Style.Ordinary,
                  unicode: '98',
                },
              ],
            },
          },
          {
            type: SCRIPTS_TYPE,
            id: Identity.getNextId(),
            nucleusId: '-2',
            superscript: {
              type: FORMULA_TYPE,
              id: Identity.getNextId(),
              elements: [
                {
                  id: Identity.getNextId(),
                  type: MATH_GLYPH_TYPE,
                  spacingStyle: Spacing_Style.Ordinary,
                  unicode: '50',
                },
                {
                  id: Identity.getNextId(),
                  type: MATH_GLYPH_TYPE,
                  spacingStyle: Spacing_Style.Ordinary,
                  unicode: '53',
                },
              ],
            },
          },
        ],
      },
    },
    // {
    //   type: TEXT_ENV_TYPE,
    //   id: Identity.getNextId(),
    //   baselineDistance: 20,
    //   baselineBump: 10,
    //   width: 300,
    //   elements: [
    //     {
    //       type: TEXT_LINE_TYPE,
    //       id: Identity.getNextId(),
    //       elements: [
    //         {
    //           type: TEXT_BLOCK_TYPE,
    //           id: Identity.getNextId(),
    //           fontSize: 30,
    //           fontName: 'Asana',
    //           content: stringToContent(
    //             'This quick brown fox jumped over the lazy dog'
    //             // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business"
    //           ),
    //         },
    //       ],
    //     },
    //     {
    //       type: TEXT_LINE_TYPE,
    //       id: Identity.getNextId(),
    //       elements: [
    //         {
    //           type: TEXT_BLOCK_TYPE,
    //           id: Identity.getNextId(),
    //           fontSize: 12,
    //           fontName: 'Asana',
    //           content: stringToContent('ILorem ipsum dolor sit amet'),
    //         },
    //       ],
    //     },
    //     {
    //       type: TEXT_LINE_TYPE,
    //       id: Identity.getNextId(),
    //       elements: [
    //         {
    //           type: TEXT_BLOCK_TYPE,
    //           id: Identity.getNextId(),
    //           fontSize: 20,
    //           fontName: 'Asana',
    //           content: stringToContent("I'm"),
    //           // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
    //         },
    //         {
    //           type: TEXT_BLOCK_TYPE,
    //           id: Identity.getNextId(),
    //           fontSize: 45,
    //           fontName: 'Asana',
    //           content: stringToContent('UPSET '),
    //           // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
    //         },
    //         {
    //           type: TEXT_BLOCK_TYPE,
    //           id: Identity.getNextId(),
    //           fontSize: 20,
    //           fontName: 'Asana',
    //           content: stringToContent('50,000'),
    //           // "ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'m minding my own damn business",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   type: 'Display',
    //   rootStyle: new Math_Style('D', 30, false),
    //   fontData: AsanaFontData,
    //   rootFormula: mlTwo,
    // },
  ],
};
