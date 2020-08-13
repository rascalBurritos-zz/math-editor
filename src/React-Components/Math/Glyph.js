import React from 'react';
import './Styles/Glyph.css';
import { ViewContext } from '../Document/ViewContext';

export class Glyph extends React.Component {
  static contextType = ViewContext;
  /**
   * @param {Object} nextProps
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return true;
    return this.props.id !== nextProps.id;
    // const viewCollection = this.context.collection;
    // const internal = viewCollection[id].internalCharacterBox;

    // const nextICB = nextProps.data.internalCharacterBox;
    // const currentICB = this.props.data.internalCharacterBox;
    // const x =
    //   nextICB.character !== currentICB.character ||
    //   nextICB.style.fontSize !== currentICB.style.fontSize;
    // return x;
  }
  /**
   * @return {JSX.Element}
   */
  render() {
    const id = this.props.id;
    const viewCollection = this.context.collection;
    const internal = viewCollection[id].internalCharacterBox;
    return (
      <div className="Glyph" style={viewCollection[id].componentStyle}>
        <internal.component data={internal} />
      </div>
    );
  }
}
