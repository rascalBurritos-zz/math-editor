import React from 'react';
import ReactDOM from 'react-dom';
import nodeTreeFactory from './Factories/nodeTreeFactory.js';
import AsanaFontData from '../../fonts/AsanaFontData.js';
import Math_Style from './Types/Math_Style';
import '../React-Components/Styles/fonts.css';
import '../React-Components/Styles/Editor.css';
import mlOne from './mathListOne.js';
import mlTwo from './mathListTwo.js';

/**
 * test sequence
 */
export default function sequence() {
  const rootStyle = new Math_Style('D', 30, false);
  const context = { fontData: AsanaFontData, rootStyle };
  const lineOneNode = nodeTreeFactory(mlOne, context);
  const lineOneBehavior = lineOneNode.behavior;
  const lineTwoNode = nodeTreeFactory(mlTwo, context);
  const lineTwoBehavior = lineTwoNode.behavior;
  console.log(lineTwoBehavior);
  const myApp = (
    <div className={'Editor'}>
      <div className="Line">
        <lineOneBehavior.component data={lineOneBehavior} />
      </div>
      <div className="Line">
        <lineTwoBehavior.component data={lineTwoBehavior} />
      </div>
    </div>
  );
  ReactDOM.render(myApp, document.getElementById('app'));
}
