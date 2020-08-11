import React from 'react';

export class DisplayEnv extends React.Component {
  /**
   * @return {JSX.Element}
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
