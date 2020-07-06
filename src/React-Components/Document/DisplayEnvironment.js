import React from 'react';
import './Styles/DisplayEnvironment.css';

export default class DisplayEnviornment extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const childBehavior = this.props.data.childBehavior;
    return (
      <div
        className="DisplayEnvironment"
        style={this.props.data.componentStyle}
      >
        <childBehavior.component data={childBehavior} />
      </div>
    );
  }
}
