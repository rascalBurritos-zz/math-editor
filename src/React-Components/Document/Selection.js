import React from 'react';
import Caret from './Caret';

export default class Selection extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const p = this.props.data.primary;
    const s = this.props.data.secondary;

    return (
      <React.Fragment>
        {p && <Caret data={p} />}
        {s && <Caret data={s} />}
      </React.Fragment>
    );
  }
}
