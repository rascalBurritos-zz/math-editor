import React from 'react';
import './Styles/Fraction.css';

export default class Fraction extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    const nb = data.numeratorBehavior;
    const db = data.denominatorBehavior;

    return (
      <div className="Fraction" style={data.componentStyle}>
        <nb.component data={nb} />
        <div style={data.ruleStyle} className="FractionRule"></div>
        <db.component data={db} />
      </div>
    );
  }
}
