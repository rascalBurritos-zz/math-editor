import React from 'react';
import './Styles/Bar.css';

export default class Bar extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    const barComponent = <div className="Bar" style={data.barStyle}></div>;
    const overbar = data.isOverbar ? barComponent : undefined;
    const underbar = data.isOverbar ? undefined : barComponent;

    return (
      <div className="BarContainer" style={data.componentStyle}>
        {overbar}
        <data.nucleusBehavior.component data={data.nucleusBehavior} />
        {underbar}
      </div>
    );
  }
}
