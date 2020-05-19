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

        return [
            nucleus,
            <scripts key="scripts" style={this.props.data.css}>
                {superscript}
                {subscript}
            </scripts>
        ];
    }
}
