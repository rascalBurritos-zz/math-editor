import React from 'react';
import ReactDOM from 'react-dom';
import nodeTreeFactory from './Factories/nodeTreeFactory.js';
import AsanaFontData from '../../fonts/AsanaFontData.js';
import Math_Style from './Types/Math_Style';
import '../React-Components/Styles/fonts.css';
import '../React-Components/Styles/Editor.css';
import tmpMathList from './tmpMathList';
/**
 * test sequence
 */
export default function sequence() {
  const rootStyle = new Math_Style('D', 30, false);
  const context = { fontData: AsanaFontData, rootStyle };
  const tmpNode = nodeTreeFactory(tmpMathList, context);
  const behavior = tmpNode.behavior;
  console.log(behavior);
  const myApp = (
    <div className={'Editor'}>
      <behavior.component data={behavior} />
    </div>
  );
  ReactDOM.render(myApp, document.getElementById('app'));
}
