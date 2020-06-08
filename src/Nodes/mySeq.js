import Spacing_Style from './Types/Spacing_Style';
import nodeTreeFactory from './Factories/nodeTreeFactory.js';
import AsanaFontData from '../../fonts/AsanaFontData.js';
import Math_Style from './Types/Math_Style';
/**
 * test sequence
 */
export default function sequence() {
  const tmpList = {
    type: 'Formula',
    spacingStyle: Spacing_Style.None,
    elements: [
      {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Binary,
        unicode: '65',
      },
    ],
  };
  const rootStyle = new Math_Style('D', 30, false);
  const context = { fontData: AsanaFontData, rootStyle };
  const tmpNode = nodeTreeFactory(tmpList, context);
  console.log(tmpNode);
}
