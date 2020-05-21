import React from "react";

export class Scripts extends React.Component {
    render() {
        var nucleus = (
            <this.props.data.nucleus.component
                key="nucleus"
                data={this.props.data.nucleus}
            />
        );
        if (this.props.data.superscript) {
            var superscript = (
                <this.props.data.superscript.component
                    key="superscript"
                    data={this.props.data.superscript}
                />
            );
        }
        if (this.props.data.subscript) {
            var subscript = (
                <this.props.data.subscript.component
                    key="subscript"
                    data={this.props.data.subscript}
                />
            );
        }

        return (
            <m-scripts-container style={this.props.data.css}>
                {nucleus}
                <m-scripts key="scripts" style={this.props.data.scriptsCSS}>
                    {superscript}
                    {subscript}
                </m-scripts>
            </m-scripts-container>
        );
    }
}
