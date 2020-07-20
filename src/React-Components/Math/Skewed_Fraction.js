import React from 'react';
import './Styles/SkewedFraction.css';

export default class Skewed_Fraction extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    const nb = data.numeratorBehavior;
    const db = data.denominatorBehavior;
    const sb = data.slashBehavior;

    return (
      <div className="SkewedFraction" style={data.componentStyle}>
        <nb.component data={nb} />
        <sb.component data={sb} />
        <db.component data={db} />
      </div>
    );
  }
}
