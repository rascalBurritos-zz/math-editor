import React from 'react';
import './Styles/Scripts.css';
import { SCRIPTS_INDEX } from '../../Text Nodes/Math Nodes/Scripts/ScriptsNode';
import { ViewContext } from '../Document/ViewContext';

export default class Scripts extends React.Component {
  static contextType = ViewContext;
  /**
   * @return {JSX.Element}
   */
  render() {
    const id = this.props.id;
    const viewCollection = this.context.collection;
    const view = viewCollection[id];
    const superId = view.childIds[SCRIPTS_INDEX.SUPER];
    const subId = view.childIds[SCRIPTS_INDEX.SUB];

    let superscript;
    let subscript;
    if (superId) {
      const superView = viewCollection[superId];
      superscript = (
        <superView.component
          className="Superscript"
          key="superscript"
          id={superId}
          type={superView.type}
        />
      );
    }
    if (subId) {
      const subView = viewCollection[subId];
      subscript = (
        <subView.component
          className="Subscript"
          key="subscript"
          id={subId}
          type={subView.type}
        />
      );
    }

    return (
      <div
        className="ScriptsContainer"
        key="SUBandSUPER"
        style={view.componentStyle}
      >
        {superscript}
        {subscript}
      </div>
    );
  }
}
