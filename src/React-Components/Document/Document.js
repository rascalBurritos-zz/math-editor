import React from 'react';
import Caret from './Caret';
import documentStartup from './documentStartup';

export default class Document extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = documentStartup();
    this.logKey = this.keyHandler.bind(this);
  }
  /**
   *
   */
  componentDidMount() {
    document.addEventListener('keydown', this.logKey);
  }

  /**
   *
   * @param {*} e
   */
  keyHandler(e) {
    this.setState((prevState) => {
      const cb = prevState.caretBehavior;
      const keyMap = {
        ArrowUp: cb.moveUp,
        ArrowDown: cb.moveDown,
        ArrowRight: cb.moveRight,
        ArrowLeft: cb.moveLeft,
      };
      if (keyMap[e.code]) {
        const caretBehavior = keyMap[e.code]();
        if (caretBehavior) {
          return { caretBehavior };
        }
      }
    });
  }
  /**
   *
   */
  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    const rootBehavior = this.state.rootNode.behavior;
    const caretBehavior = this.state.caretBehavior;
    console.log(this.state);
    return (
      <div>
        <rootBehavior.component data={rootBehavior}></rootBehavior.component>
        <Caret data={caretBehavior} />
      </div>
    );
  }
}
