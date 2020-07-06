import React from 'react';
import './Styles/InternalCharacterBox.css';

export default class InternalCharacterBox extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div style={this.props.data.style} className="InternalCharacterBox">
        {this.props.data.character}
      </div>
    );
  }
}
