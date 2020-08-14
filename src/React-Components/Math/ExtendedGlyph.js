import React from 'react';
import './Styles/ExtendedGlyph.css';
import { ViewContext } from '../Document/ViewContext';

export class ExtendedGlyph extends React.Component {
  static contextType = ViewContext;
  /**
   * @return {JSX.Element}
   */
  render() {
    const id = this.props.id;
    const viewCollection = this.context.collection;
    const view = viewCollection[id];
    return (
      <div>
        <svg
          style={view.componentStyle}
          className="ExtendedGlyph"
          viewBox={view.viewBox}
        >
          <path d={view.path} />
        </svg>
      </div>
    );
  }
}
