import React from 'react';
import './Styles/Caret.css';

export default class Caret extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const caretStyle = this.props.data;
    return <div className="Caret" style={caretStyle}></div>;
  }
}
