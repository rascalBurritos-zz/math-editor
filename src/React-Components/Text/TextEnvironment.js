import './Styles/TextEnvironment.css';
import React from 'react';
import compoundFactory from './compoundFactory';

export const TextEnvironment = compoundFactory('TextEnvironment');
// export class TextEnvironment extends React.Component {
//   /**
//    * @return {JSX.Element}
//    */
//   render() {
//     const view = this.props.data;
//     const lines = view.lines.map((line, index) => {
//       const blocks = line.elements.map((block, index) => {
//         return (
//           <block.component key={genId(index)} data={block}></block.component>
//         );
//       });

//       return (
//         <div
//           key={genId(index)}
//           style={line.componentStyle}
//           className="TextEnvLine"
//         >
//           {blocks}
//         </div>
//       );
//     });
//     // line[] -> line
//     return <div className="TextEnvironment">{lines}</div>;
//   }
// }

// /**
//  * @param {number} num
//  * @return {number}
//  */
// export function genId(num) {
//   return Math.random() * num * 100000;
// }