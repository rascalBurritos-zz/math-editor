import React from "react";

export class ExtendedGlyph extends React.Component {
    render() {
        console.log(this.props);
        var components = this.props.data.elements.map((ele, index) => {
            ele.outer.backgroundColor = 'white'
            ele.inner.backgroundColor = 'white'
            ele.outer.mixBlendMode = 'darken'
            return (
                <div key={index} style={ele.outer}>
                    <div style={ele.inner}>
                            {ele.symbol}
                    </div>
                </div>
            );
        });
        return <extended>{components}</extended>;
    }
}
