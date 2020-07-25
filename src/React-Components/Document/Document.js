import React from 'react';
import documentStartup from './documentStartup';
import documentViewFactory from '../../Factories/documentViewFactory';
import getCaretView from '../../../Experiment 2/keyChainToViewPoint';
import Caret from './Caret';
import documentKeyEventHandler from './documentKeyEventHandler';
import Selection from './Selection';
import getSelectionData from './getSelectionData';

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
   * @param {*} event
   */
  keyHandler(event) {
    this.setState((prevState) => {
      return documentKeyEventHandler(event, prevState);
    });
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    const s = this.state;
    // console.log(s);
    const rootView = documentViewFactory(s.model);
    const selectionData = getSelectionData(rootView, s.selection);
    return (
      <div>
        <rootView.component data={rootView}></rootView.component>
        <Selection data={selectionData} />
      </div>
    );
  }
}
