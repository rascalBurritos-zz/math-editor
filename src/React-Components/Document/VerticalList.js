import './Styles/VerticalList.css';
import compoundFactory from '../Text/compoundFactory';

const vl = compoundFactory('VerticalList');
export const VerticalList = vl;
// export default class VerticalList extends React.Component {
//   /**
//    * @return {JSX.Element}
//    */
//   render() {
//     const elements = this.props.data.elements.map((ele, index) => {
//       return <ele.component key={index} data={ele} />;
//     });

//     return (
//       <div className="VerticalList" style={this.props.data.componentStyle}>
//         {elements}
//       </div>
//     );
//   }
// }
