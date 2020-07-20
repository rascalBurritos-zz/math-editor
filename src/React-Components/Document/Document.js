import React from 'react';
import documentStartup from './documentStartup';
import documentViewFactory from '../../Factories/documentViewFactory';
import getCaretView from '../../../Experiment 2/getCaretView';
import Caret from './Caret';

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
    console.log(this.state.model);
    const rootBehavior = documentViewFactory(this.state.model);
    console.log(rootBehavior);
    const caretStyle = getCaretView(rootBehavior, this.state.caretKeychain);
    return (
      <div>
        <rootBehavior.component data={rootBehavior}></rootBehavior.component>
        <Caret data={caretStyle} />
      </div>
    );
  }
}
