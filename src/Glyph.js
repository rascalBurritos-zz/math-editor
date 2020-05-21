import React from "react";

export class Glyph extends React.Component {
    render() {
        return (
            <m-glyph style={this.props.data.css}>
                <div style={this.props.data.innerStyle}>
                    {this.props.data.symbol}
                </div>
            </m-glyph>
        );
    }
}
