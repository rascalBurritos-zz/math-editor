import React from 'react';
import './Styles/Radical.css';

export class Radical extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const d = this.props.data;
    const degree = d.degreeBehavior ? (
      <d.degreeBehavior.component key={'degree'} data={d.degreeBehavior} />
    ) : undefined;
    return (
      <div className="Radical" style={d.componentStyle}>
        <div style={d.containerDimensions} className="RadicalContainer">
          {degree}
          <d.radicandBehavior.component
            key={'radicand'}
            data={d.radicandBehavior}
          />
        </div>
        <d.radicalGlyphBehavior.component
          key={'radicand glyph'}
          data={d.radicalGlyphBehavior}
        />
      </div>
    );
  }
}
