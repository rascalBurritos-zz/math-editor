import React from 'react';
import './Styles/Radical.css';
import { ViewContext } from '../Document/ViewContext';

export default class Radical extends React.Component {
  static contextType = ViewContext;
  /**
   * @return {JSX.Element}
   */
  render() {
    const id = this.props.id;
    const viewCollection = this.context.collection;
    const d = viewCollection[id];
    let degree;
    const degreeId = d.childIds.degree;
    if (degreeId) {
      const degreeView = viewCollection[degreeId];
      degree = (
        <degreeView.component
          key={'degree'}
          id={d.childIds.degree}
          type={degreeView.type}
        />
      );
    }
    const radicandId = d.childIds.radicand;
    const radicandView = viewCollection[radicandId];
    const radicalGlyphId = d.childIds.radicalGlyph;
    const radicalGlyph = viewCollection[radicalGlyphId];

    return (
      <div className="Radical" style={d.componentStyle}>
        <div style={d.containerDimensions} className="RadicalContainer">
          {degree}
          <radicandView.component
            key={'radicand'}
            id={radicandId}
            type={radicandView.type}
          />
        </div>
        <radicalGlyph.component
          key={'radicand glyph'}
          id={radicalGlyphId}
          type={radicalGlyph.type}
        />
      </div>
    );
  }
}
