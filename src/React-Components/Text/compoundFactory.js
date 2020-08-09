import React from 'react';
import './Styles/TextBlock.css';
import { ViewContext } from '../Document/ViewContext';

/**
 * @param {String} className
 * @return {Function}
 */
export default function compoundFactory(className) {
  return class _Compound extends React.Component {
    static contextType = ViewContext;

    /**
     * @param {Object} nextProps
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps) {
      return this.props.id !== nextProps.id;
    }
    /**
     *@return {JSX.Element}
     */
    render() {
      const id = this.props.id;
      const viewCollection = this.context.collection;
      const elements = viewCollection[id].childIds.map((childId) => {
        const childView = viewCollection[childId];
        return <childView.component key={childId} id={childId} />;
      });
      return (
        <div className={className} style={viewCollection[id].componentStyle}>
          {elements}
        </div>
      );
    }
  };
}
