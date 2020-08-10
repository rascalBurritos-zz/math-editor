import React from 'react';
import './Styles/TextBlock.css';
import { ViewContext } from '../Document/ViewContext';

/**
 * @param {String} className
 * @return {Function}
 */
export class Compound extends React.Component {
  static contextType = ViewContext;

  /**
   * @param {Object} nextProps
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return true;
    if (nextProps.id in this.context.mutationMap) {
      return true;
    }
    return false;
  }
  /**
   *@return {JSX.Element}
   */
  render() {
    const id = this.props.id;
    const viewCollection = this.context.collection;
    const elements = viewCollection[id].childIds.map((childId) => {
      const childView = viewCollection[childId];
      return (
        <childView.component key={childId} id={childId} type={childView.type} />
      );
    });
    return (
      <div
        className={this.props.type}
        style={viewCollection[id].componentStyle}
      >
        {elements}
      </div>
    );
  }
}
