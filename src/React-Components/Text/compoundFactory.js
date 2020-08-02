import React from 'react';
import './Styles/TextBlock.css';
import { CompoundTable } from '../../Interaction/Tables/nodeTable';

/**
 * @param {String} className
 * @return {Function}
 */
export default function compoundFactory(className) {
  return function _Compound(props) {
    const view = props.data;
    const compound = CompoundTable.retrieve(view.type);
    const elements = compound.getElements(view, true).map((ele, index) => {
      return <ele.component key={index} data={ele} />;
    });
    return (
      <div className={className} style={props.data.componentStyle}>
        {elements}
      </div>
    );
  };
}
