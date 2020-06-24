import React from 'react';
import './Styles/StretchStack.css';

export default class Stretch_Stack extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    let upperLimit;
    let lowerLimit;
    const nucleusBehavior = data.nucleusBehavior;
    const nucleus = (
      <nucleusBehavior.component key="nucleus" data={data.nucleusBehavior} />
    );
    if (data.upperLimitBehavior) {
      const upperLimitBehavior = data.upperLimitBehavior;
      upperLimit = (
        <upperLimitBehavior.component
          key="upper limit"
          data={upperLimitBehavior}
        />
      );
    }
    if (data.lowerLimitBehavior) {
      const lowerLimitBehavior = data.lowerLimitBehavior;
      lowerLimit = (
        <lowerLimitBehavior.component
          key="lower limit"
          data={lowerLimitBehavior}
        />
      );
    }

    return (
      <div className="StretchStack" style={data.componentStyle}>
        {upperLimit}
        {nucleus}
        {lowerLimit}
      </div>
    );
  }
}
