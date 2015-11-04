"use strict";

import React, { Component } from "react";

import PictureGenerator from "./picture-generator";
import PictureViewer from "./picture-viewer";

export default class App extends Component {
    constructor(args) {
        super(args);

        this.state = {
            width: 600,
            cap: 10,
            minHeight: 150,
            maxHeight: 300,
            optimalHeight: 200,
            cols: 4,
            pics: 33
        };
    }
    onChange(name, val) {
        if (this.state.hasOwnProperty(name)) {
            this.setState({
                [name]: +val
            });
        }
    }
    render() {
        let state = this.state;
        return (
            <div>
                <PictureGenerator width={state.width} cap={state.cap} minHeight={state.minHeight}
                    maxHeight={state.maxHeight} optimalHeight={state.optimalHeight} cols={state.cols}
                    pics={state.pics}
                    onChange={this.onChange.bind(this)} />
                <PictureViewer width={state.width} cap={state.cap} minHeight={state.minHeight}
                    maxHeight={state.maxHeight} optimalHeight={state.optimalHeight} cols={state.cols}
                    pics={state.pics} />
            </div>
        );
    }
}
