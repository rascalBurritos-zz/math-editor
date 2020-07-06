import React from 'react';
import ReactDOM from 'react-dom';
import '../React-Components/Math/Styles/fonts.css';
import '../React-Components/Math/Styles/Editor.css';
import documentNodeFactory from '../Factories/documentNodeFactory.js';
import docListOne from './docListOne';

/**
 * test sequence
 */
export default function sequence() {
  const myDoc = documentNodeFactory(docListOne);
  const behavior = myDoc.behavior;
  console.log(behavior);
  const myApp = (
    <div className={'Editor'}>
      <behavior.component data={behavior} />
    </div>
  );
  ReactDOM.render(myApp, document.getElementById('app'));
}
