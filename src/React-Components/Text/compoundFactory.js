import React from 'react';
import './Styles/TextBlock.css';

/**
 * @param {String} className
 * @return {Function}
 */
export default function compoundFactory(className) {
  return class _Compound extends React.Component {
    /**
     * @param {Object} nextProps
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps) {
      return this.props.data.id !== nextProps.data.id;
      // return !this.props.data.metrics.equal(nextProps.data.metrics);
    }
    /**
     *@return {JSX.Element}
     */
    render() {
      const view = this.props.data;
      const elements = view.elements.map((ele) => {
        return <ele.component key={ele.id} data={ele} />;
      });
      return (
        <div className={className} style={this.props.data.componentStyle}>
          {elements}
        </div>
      );
    }
  };
}
