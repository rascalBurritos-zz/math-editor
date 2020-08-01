import React from 'react';
import Caret from './Caret';
import './Styles/Selection.css';

export default class Selection extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const p = this.props.data.primary;
    const s = this.props.data.secondary;
    const selectionRects = this.props.data.selectionRects;
    let selectionDivs;
    if (selectionRects) {
      selectionDivs = selectionRects.map((rect, index) => {
        const rectStyle = rect.toStyle();
        return (
          <div
            className="SelectionBlock"
            key={rectStyle.width + index}
            style={rectStyle}
          ></div>
        );
      });
    }
    return (
      <React.Fragment>
        {p && <Caret data={p} />}
        {selectionDivs}
        {s && <Caret data={s} />}
      </React.Fragment>
    );
  }
}
