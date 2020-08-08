import React from 'react';
import './Styles/Glyph.css';

export class Glyph extends React.Component {
  /**
   * @param {Object} nextProps
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.data.internalCharacterBox.character !==
      this.props.data.internalCharacterBox.character
    );
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
