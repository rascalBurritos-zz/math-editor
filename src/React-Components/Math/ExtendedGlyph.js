import React from 'react';
import './Styles/ExtendedGlyph.css';

export class ExtendedGlyph extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div>
        {this.props.data.caret}
        <svg
          style={this.props.data.componentStyle}
          className="ExtendedGlyph"
          viewBox={this.props.data.viewBox}
        >
          <path d={this.props.data.path} />
        </svg>
      </div>
    );
  }
}
