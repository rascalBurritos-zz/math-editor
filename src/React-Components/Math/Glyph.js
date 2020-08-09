import React from 'react';
import './Styles/Glyph.css';

export class Glyph extends React.Component {
  /**
   * @param {Object} nextProps
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps) {
    const nextICB = nextProps.data.internalCharacterBox;
    const currentICB = this.props.data.internalCharacterBox;
    const x =
      nextICB.character !== currentICB.character ||
      nextICB.style.fontSize !== currentICB.style.fontSize;
    console.log(x);
    return x;
  }
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    const internal = data.internalCharacterBox;
    return (
      <div className="Glyph" style={data.componentStyle}>
        <internal.component data={internal} />
      </div>
    );
  }
}
