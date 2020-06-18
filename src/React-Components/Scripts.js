import React from 'react';
import './Styles/Scripts.css';

export default class Scripts extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    let superscript;
    let subscript;
    const nucleusBehavior = data.nucleusBehavior;
    const nucleus = (
      <nucleusBehavior.component key="nucleus" data={data.nucleusBehavior} />
    );
    if (data.superBehavior) {
      const superBehavior = data.superBehavior;
      superscript = (
        <superBehavior.component
          className="Superscript"
          key="superscript"
          data={data.superBehavior}
        />
      );
    }
    if (data.subBehavior) {
      const subBehavior = data.subBehavior;
      subscript = (
        <subBehavior.component
          className="Subscript"
          key="subscript"
          data={data.subBehavior}
        />
      );
    }

    return (
      <div className="ScriptsContainer" style={data.componentStyle}>
        {nucleus}
        <div
          className="Scripts"
          key="scripts"
          style={data.scriptsComponentStyle}
        >
          {superscript}
          {subscript}
        </div>
      </div>
    );
  }
}
