"use strict";

import React, { Component } from "react";

import NOOP from "./noop";
import PictureGenerator from "./picture-generator";
import PictureViewer from "./picture-viewer";

export default class App extends Component {
    render() {
        return (
            <NOOP>
                <PictureGenerator />
                <PictureViewer />
            </NOOP>
        );
    }
}
