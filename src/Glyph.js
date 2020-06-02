import React from "react";

export class Glyph extends React.Component {
    render() {
        let height = this.props.data.css.height.replace('px', '')
        let width = this.props.data.width;
        let textHeight = this.props.data.height;
        let symbol = this.props.data.symbol;
        let css = this.props.data.css
        // console.log(this.props.data.innerStyle.fontSize)
        css.fontSize = this.props.data.innerStyle.fontSize
        css.fontFamily = this.props.data.innerStyle.fontFamily
        let left = this.props.data.innerStyle.left.replace('px', '')
        return (
            <m-glyph style={this.props.data.css}>
                <div style={this.props.data.innerStyle}>
                    {this.props.data.symbol}
                </div>
            </m-glyph>
        );
    }
}
        // return (
            // {/* <m-glyph style={css}> */}
            // {/*     <svg viewBox={`0 0 ${width} ${height}`} > */}
            // {/*     <text x={`${left}`} y={`${textHeight}`}> */}
            // {/*         {symbol} */}
            // {/*     </text> */}
            // {/* </svg> */}
            // {/* </m-glyph> */}
        // {/* ); */}
