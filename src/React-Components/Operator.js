import React from 'react';
import './Styles/Operator.css';

export class Operator extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    let upperLimit;
    let lowerLimit;
    let target;
    const nucleusBehavior = data.nucleusBehavior;
    const nucleus = (
      <nucleusBehavior.component key="nucleus" data={data.nucleusBehavior} />
    );
    if (data.upperLimit) {
      upperLimit = (
        <data.upperLimitBehavior.component
          key="upper limit"
          data={data.upperLimitBehavior}
        />
      );
    }
    if (data.lowerLimit) {
      lowerLimit = (
        <data.lowerLimitBehavior.component
          key="lower limit"
          data={data.lowerLimitBehavior}
        />
      );
    }
    if (data.target) {
      target = (
        <data.targetBehavior.component
          key="target"
          data={data.targetBehavior}
        />
      );
    }

    return (
      <div style={data.componentStyle}>
        <div>
          {upperLimit}
          {nucleus}
          {lowerLimit}
        </div>
        {target}
      </div>
    );
  }
}
