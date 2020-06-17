import React from 'react';
import './Styles/Accent.css';

export class Accent extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    console.log(data);
    const nucleusBehavior = data.nucleusBehavior;
    const accenterBehavior = data.accenterBehavior;

    return (
      <div className="Accent" style={data.componentStyle}>
        <accenterBehavior.component key="accenter" data={accenterBehavior} />
        <nucleusBehavior.component key="nucleus" data={nucleusBehavior} />
      </div>
    );
  }
}
