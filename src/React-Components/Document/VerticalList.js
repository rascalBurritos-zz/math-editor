import React from 'react';
import './Styles/VerticalList.css';

export default class VerticalList extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const elements = this.props.data.elementBehaviors.map((ele, index) => {
      return <ele.component key={index} data={ele} />;
    });

    return (
      <div className="VerticalList" style={this.props.data.componentStyle}>
        {elements}
      </div>
    );
  }
}
