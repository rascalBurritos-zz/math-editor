import React from 'react';
import './Styles/TextBlock.css';

export default class TextBlock extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const view = this.props.data;
    const elements = view.elements.map((ele, index) => {
      return <ele.component key={index} data={ele} />;
    });
    return (
      <div className="TextBlock" style={this.props.data.componentStyle}>
        {elements}
      </div>
    );
  }
}
