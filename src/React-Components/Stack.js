import React from 'react';
import './Styles/Stack.css';

export default class Stack extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    const nb = data.numeratorBehavior;
    const db = data.denominatorBehavior;

    return (
      <div className="Stack" style={data.componentStyle}>
        <nb.component data={nb} />
        <db.component data={db} />
      </div>
    );
  }
}
