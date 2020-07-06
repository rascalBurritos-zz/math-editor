import React from 'react';
import './Styles/TextEnvironment.css';

export default class TextEnvironment extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const childBehavior = this.props.data.childBehavior;
    return (
      <div className="TextEnvironment" style={this.props.data.componentStyle}>
        <childBehavior.component data={childBehavior}></childBehavior.component>
      </div>
    );
  }
}
