import React from "react";

export class Radical extends React.Component {
    render() {
        var d = this.props.data;
        return (
            <m-radical style={d.css}>
                <d.degree.component key={d.degree.component} data={d.degree} />
                <d.delimiter.component
                    key={d.delimiter.component}
                    data={d.delimiter}
                />
                <m-radicand-container style={d.radicandContainerCSS}>
                    <m-rule style={d.rule} />
                    <d.radicand.component
                        key={d.radicand.component}
                        data={d.radicand}
                    />
                </m-radicand-container>
            </m-radical>
        );
    }
}
