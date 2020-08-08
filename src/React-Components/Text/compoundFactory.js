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
      return true;
      // return !this.props.data.metrics.equal(nextProps.data.metrics);
    }
    /**
     *@return {JSX.Element}
     */
    render() {
      const view = this.props.data;
      const elements = view.elements.map((ele, index) => {
        return <ele.component key={genId(index)} data={ele} />;
      });
      return (
        <div className={className} style={this.props.data.componentStyle}>
          {elements}
        </div>
      );
    }
  };
}

/**
 *
 * @param {*} num
 */
function genId(num) {
  return Math.random() * 100000 * num;
}
