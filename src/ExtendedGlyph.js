import React from "react";

export class ExtendedGlyph extends React.Component {
    render() {
        let partialGlyphArray = this.props.data.svgConstruction
            .partialSVGGlyphArray;
        let paths = partialGlyphArray.map((partialSVGGlyph, index) => {
            let clipRects = this.props.data.svgConstruction.clipRects;
            let identifier = Math.random() * 10000;
            return (
                <g key={index} transform={partialSVGGlyph.transform}>
                    <clipPath id={"A" + String.fromCharCode(identifier)}>
                        <rect
                            width={clipRects[index].width}
                            height={clipRects[index].height}
                        />
                    </clipPath>
                    <path
                        clipPath={
                            "url(#" +
                            "A" +
                            String.fromCharCode(identifier) +
                            ")"
                        }
                        style={{ opacity: 1 }}
                        d={partialSVGGlyph.path}
                    ></path>
                </g>
            );
        });
        return (
            <m-extended style={this.props.data.css}>
                <svg viewBox={this.props.data.viewBox}>
                    <g transform={this.props.data.svgConstruction.transform}>
                        {paths}
                    </g>
                </svg>
            </m-extended>
        );
    }
}
