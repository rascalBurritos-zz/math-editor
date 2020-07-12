import React from 'react';
import './Styles/Accent.css';

export default class Accent extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    const nucleusBehavior = data.nucleusBehavior;
    const accenterBehavior = data.accenterBehavior;

    return (
      <div className="Accent" style={data.componentStyle}>
        {this.props.data.caret}
        <accenterBehavior.component key="accenter" data={accenterBehavior} />
        <nucleusBehavior.component key="nucleus" data={nucleusBehavior} />
      </div>
    );
  }
}
