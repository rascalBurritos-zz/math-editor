import React from 'react';

export default class Delimiter extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;

    return (
      <div style={data.componentStyle}>
        {this.props.data.caret}
        <data.glyphBehavior.component data={data.glyphBehavior} />
      </div>
    );
  }
}
