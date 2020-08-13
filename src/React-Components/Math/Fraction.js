import React from 'react';
import './Styles/Fraction.css';
import { ViewContext } from '../Document/ViewContext';

export default class Fraction extends React.Component {
  static contextType = ViewContext;
  /**
   * @return {JSX.Element}
   */
  render() {
    const id = this.props.id;
    const viewCollection = this.context.collection;
    const view = viewCollection[id];
    const numId = view.childIds.num;
    const denomId = view.childIds.denom;
    const nb = viewCollection[numId];
    const db = viewCollection[denomId];

    return (
      <div className="Fraction" style={view.componentStyle}>
        <nb.component id={nb.id} type={nb.type} />
        <div style={view.ruleStyle} className="FractionRule"></div>
        <db.component id={db.id} type={db.type} />
      </div>
    );
  }
}
