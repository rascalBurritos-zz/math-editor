import React from "react";
import ReactDOM from "react-dom";
import { Formula } from "./Formula.js";
import { FormulaComponentData } from "./FormulaComponentData.js";
import { fontFactory } from "./Font/FontFactory.js";
import AsanaFontTables from "../fonts/AsanaFontData.js";
import { MathStyle } from "./MathStyle.js";
import "./customElements.js";
import "./styles/fonts.css";
var mathList = [
        { type: "Ordinary", unicode: "70" },
        {
            type: "Radical",
            degree: [{ type: "Ordinary", unicode: "70" }],
            radicand: [{
                type: "Ordinary",
                extension: "Extended",
                desiredSize: 200,
                direction: "vertical",
                unicode: "8747"
            }]
        },
        {
            type: "Ordinary",
            extension: "Extended",
            desiredSize: 300,
            direction: "horizontal",
            unicode: "10503"
        },
        {
            type: "Script",
            nucleus: {
                type: "Ordinary",
                extension: "Extended",
                desiredSize: 200,
                direction: "vertical",
                unicode: "8747"
            },
            superscript: [
                {
                    type: "Ordinary",
                    unicode: "72"
                }
            ],

            subscript: [
                {
                    type: "Ordinary",
                    unicode: "73"
                }
            ]
        },
        {
            type: "Script",
            nucleus: {
                type: "Ordinary",
                unicode: "8706"
            },
            superscript: [
                {
                    type: "Ordinary",
                    unicode: "72"
                },
                {
                    type: "Binary",
                    unicode: "43"
                },
                {
                    type: "Ordinary",
                    unicode: "73"
                }
            ],

            subscript: [
                {
                    type: "Ordinary",
                    unicode: "73"
                }
            ]
        },
        { type: "Ordinary", unicode: "65" },
        { type: "Relation", unicode: "66" },
        { type: "Ordinary", unicode: "67" },
        { type: "Binary", unicode: "68" }
    ],
    fontData = fontFactory(AsanaFontTables),
    baseStyle = new MathStyle("D", 30, false);
var myApp = (
    <div
        style={{
            marginTop: "100px",
            outline: "1px solid rebeccapurple",
            marginRight: "auto",
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        }}
    >
        <Formula
            data={new FormulaComponentData(mathList, fontData, baseStyle)}
        />
    </div>
);

ReactDOM.render(myApp, document.getElementById("app"));
