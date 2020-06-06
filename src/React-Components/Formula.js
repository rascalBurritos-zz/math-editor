import React from "react";

export class Formula extends React.Component {
    render() {
        var formulaElements = this.props.data.elements.map((ele, index) => {
            return <ele.component key={index} data={ele} />;
        });

        return <div className="Formula" style={this.props.data.css}>{formulaElements}</div>;
    }
}

