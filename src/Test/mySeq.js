import React from 'react';
import ReactDOM from 'react-dom';
import '../React-Components/Math/Styles/fonts.css';
import '../React-Components/Math/Styles/Editor.css';
import Document from '../React-Components/Document/Document';

/**
 * test sequence
 */
export default function sequence() {
  const myApp = (
    <div className={'Editor'}>
      <Document />
    </div>
  );
  ReactDOM.render(myApp, document.getElementById('app'));
}
