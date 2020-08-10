import React from 'react';
import documentStartup from './documentStartup';
import documentKeyEventHandler from '../../Interaction/Events/documentKeyEventHandler';
import Selection from './Selection';
import getSelectionData from '../../Interaction/Selection/getSelectionData';
import documentMouseEventHandler from '../../Interaction/Events/documentMouseEventHandler';
import './Styles/Document.css';
import { ViewMaster } from '../../Text Nodes/Functional/ViewMaster';
import { ViewContext } from './ViewContext';
import { Perf } from '../../Interaction/Util/perf';

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
    this.viewContainer = {};
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
    this.viewContainer.mutationMap = s.mutationMap;
    console.log(s);
    // Perf.start();
    const viewMaster = new ViewMaster(s.model);
    // Perf.end();
    this.viewContainer.collection = viewMaster.viewCollection;
    // console.log(s);
    const rootId = viewMaster.rootId;
    const selectionData = getSelectionData(
      s.model,
      rootId,
      this.viewContainer.collection,
      s.selection
    );
    const Root = this.viewContainer.collection[rootId];
    const style = { border: '1px solid black' };
    return (
      <div className="Document" style={style}>
        <div id={this.id} className="FittingContainer">
          <ViewContext.Provider value={this.viewContainer}>
            <Root.component id={rootId} type={Root.type}></Root.component>
          </ViewContext.Provider>
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
