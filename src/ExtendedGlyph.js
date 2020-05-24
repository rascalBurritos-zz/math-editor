import React from "react";

export class ExtendedGlyph extends React.Component {
    render() {
        var viewBox = { offset:0,heightArray: [], depthArray: [], widthArray: [] };
        var components = this.props.data.elements.map((ele, index) => {
            // ele.outer.backgroundColor = 'white'
            //// ele.inner.backgroundColor = 'white'
            // ele.outer.mixBlendMode = 'darken'

            let depth = ele.depth;
            let height = ele.height + depth; //ele.outer.height.replace("px", "");
            let width = ele.width; //ele.outer.width.replace("px", "");
            let left = ele.inner.left.replace("px", "");
            let textHeight = ele.textHeight;
            let symbol = ele.symbol;
            let style = ele.outer;
            style.fontFamily = ele.inner.fontFamily;
            style.fontSize = ele.inner.fontSize;
            if (index === 0 && index === this.props.data.elements.length - 1) {
                return (
                    <div key={index} style={ele.outer}>
                        <div style={ele.inner}>{ele.symbol}</div>
                    </div>
                );
            } else {
                viewBox.heightArray.push(height);
                viewBox.depthArray.push(depth);
                viewBox.widthArray.push(width);
                let transform = "translate(" + viewBox.offset +', 0)'; //`translate(0,${height }) scale(1, -1)  `//translate(0, ${(0)}) `//scale(1,-1)`
                viewBox.offset+=width;
                return (
                    // <svg style={style} viewBox={`0 ${depth} ${width} ${height}`}>
                    <path transform={transform} d={ele.path} />
                    // </svg>
                );
            }
        });
        viewBox.depth = Math.max(...viewBox.depthArray);
        viewBox.height = Math.max(...viewBox.heightArray);
        viewBox.width = viewBox.widthArray.reduce((acc, curr) => {
            return acc + curr;
        }, 0);
        return (
            <m-extended style={this.props.data.css}>
                <svg
                    style={this.props.data.css}
                    viewBox={
                        "0 " +
                        viewBox.depth +
                        " " +
                        viewBox.width +
                        " " +
                        viewBox.height
                    }
                >
                    {components}
                </svg>
            </m-extended>
        );
    }
}
