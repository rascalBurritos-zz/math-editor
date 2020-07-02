import React from 'react';
import './Styles/DisplayEnvironment.css';

export default class DisplayEnviornment extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const behavior = this.props.data.rootFormulaBehavior;
    return (
      <div className="DisplayEnvironment">
        <behavior.component data={behavior} />
      </div>
    );
  }
}
