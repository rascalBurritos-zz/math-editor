import React from 'react';
import './Styles/Caret.css';

export default class Caret extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const caretData = this.props.data;
    // console.log(caretData);
    const caretStyle = caretData.style;
    const className = caretData.isBlinking ? 'Caret Blink' : 'Caret';
    return <div className={className} style={caretStyle}></div>;
  }
}
