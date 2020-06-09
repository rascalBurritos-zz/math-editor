import React from 'react';
import ReactDOM from 'react-dom';
import Spacing_Style from './Types/Spacing_Style';
import nodeTreeFactory from './Factories/nodeTreeFactory.js';
import AsanaFontData from '../../fonts/AsanaFontData.js';
import Math_Style from './Types/Math_Style';
import '../React-Components/Styles/fonts.css';
import '../React-Components/Styles/Editor.css';
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
        spacingStyle: Spacing_Style.Relation,
        unicode: '112',
      },
      {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '109',
      },
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
  const behavior = tmpNode.behavior;
  console.log(behavior);
  const myApp = (
    <div className={'Editor'}>
      <tmpNode.behavior.component data={behavior} />
    </div>
  );
  ReactDOM.render(myApp, document.getElementById('app'));
}
