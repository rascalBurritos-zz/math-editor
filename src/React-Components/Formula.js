import React from 'react';
import './Styles/Formula.css';

export default class Formula extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const formulaElements = this.props.data.elementBehaviors.map(
      (ele, index) => {
        return <ele.component key={index} data={ele} />;
      }
    );

    return (
      <div className="Formula" style={this.props.data.componentStyle}>
        {formulaElements}
      </div>
    );
  }
}
