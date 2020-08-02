import React from 'react';
import documentStartup from './documentStartup';
import documentKeyEventHandler from '../../Interaction/Events/documentKeyEventHandler';
import Selection from './Selection';
import getSelectionData from '../../Interaction/Selection/getSelectionData';
import documentMouseEventHandler from '../../Interaction/Events/documentMouseEventHandler';
import funcDocumentViewFactory from '../../Text Nodes/Functional/funcDocumentViewFactory';
import './Styles/Document.css';

export default class Document extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = documentStartup();
    this.id = genID();
    this.logKey = this.keyHandler.bind(this);
    this.logMouseDown = this.mouseHandler.bind(this, MOUSE.DOWN);
    this.logMouseMove = this.mouseHandler.bind(this, MOUSE.MOVE);
    this.logMouseUp = this.mouseHandler.bind(this, MOUSE.UP);
    this.isSelecting = false;
    // this.numMouseMoves = 0;
    // this.currentMillis = new Date();
    // this.previousMillis = this.currentMillis;
    // setInterval(() => {
    //   this.currentMillis = new Date();
    //   console.log(this.numMouseMoves, this.currentMillis - this.previousMillis);
    //   this.numMouseMoves = 0;
    //   this.previousMillis = this.currentMillis;
    // }, 1000);
    /**
     * @return {String}
     */
    function genID() {
      return Math.floor(Math.random() * 10000).toString();
    }
  }
  /**
   *
   */
  componentDidMount() {
    document.addEventListener('keydown', this.logKey);
    document.addEventListener('mousedown', this.logMouseDown);
    document.addEventListener('mouseup', this.logMouseUp);
    document.addEventListener('mousemove', this.logMouseMove);
  }

  /**
   * @param {String} type MOUSE type string
   * @param {*} event
   */
  mouseHandler(type, event) {
    let resetAnchor;
    if (type === MOUSE.DOWN) {
      this.isSelecting = true;
      resetAnchor = true;
    } else if (type === MOUSE.UP) {
      this.isSelecting = false;
      resetAnchor = false;
    } else if (type === MOUSE.MOVE && this.isSelecting) {
      resetAnchor = false;
    } else if (type === MOUSE.MOVE && !this.isSelecting) {
      return;
    }
    this.setState((prevState) => {
      return documentMouseEventHandler(event, prevState, this.id, resetAnchor);
    });
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
    // const rootView = documentViewFactory(s.model);
    // console.log(s);
    const rootView = funcDocumentViewFactory(s.model);
    const selectionData = getSelectionData(s.model, rootView, s.selection);
    const style = { border: '1px solid black' };
    return (
      <div className="Document" style={style}>
        <div id={this.id} className="FittingContainer">
          <rootView.component data={rootView}></rootView.component>
          <Selection data={selectionData} />
        </div>
      </div>
    );
  }
}

export const MOUSE = {
  MOVE: 'MOVE',
  DOWN: 'DOWN',
  UP: 'UP',
};
