import React from 'react';
import documentStartup from './documentStartup';
import documentViewFactory from '../../Factories/documentViewFactory';
import getCaretView from '../../../Experiment 2/keyChainToViewPoint';
import Caret from './Caret';
import caretTraverser, {
  DIRECTION,
} from '../../../Experiment 2/caretTraverser';
import determineKeychain from '../../../Experiment 2/determineKeychain';

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
      const keyMap = {
        ArrowUp: DIRECTION.UP,
        ArrowDown: DIRECTION.DOWN,
        ArrowRight: DIRECTION.RIGHT,
        ArrowLeft: DIRECTION.LEFT,
      };
      if (keyMap[e.code]) {
        const direction = keyMap[e.code];
        const ck = prevState.caretKeychain;
        const model = prevState.model;
        const newKeychain = determineKeychain(ck, model, direction);
        return { caretKeychain: newKeychain };
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
    // console.log(this.state);
    const rootBehavior = documentViewFactory(this.state.model);
    const caretStyle = getCaretView(rootBehavior, this.state.caretKeychain)
      .position;
    return (
      <div>
        <rootBehavior.component data={rootBehavior}></rootBehavior.component>
        <Caret data={caretStyle} />
      </div>
    );
  }
}
