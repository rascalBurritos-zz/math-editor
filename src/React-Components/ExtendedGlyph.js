import React from 'react';

export class ExtendedGlyph extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <svg
        style={this.props.data.componentStyle}
        className="ExtendedGlyph"
        viewBox={this.props.data.viewBox}
      >
        <path d={this.props.data.path} />
      </svg>
    );
  }
}
