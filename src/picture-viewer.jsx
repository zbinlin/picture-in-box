"use strict";

import React, { Component } from "react";

import gen from "./gen";
import picturePacker from "./picture-picker";

import styles from "./picture-viewer.scss";

export default class PictureViewer extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this._holdUpdate) {
            return false;
        } else {
            this._holdUpdate = true;
            setTimeout(() => {
                this._holdUpdate = false;
            }, 2000);
            return true;
        }
    }
    render() {
        let props = this.props;
        let pics = gen(props);
        pics = picturePacker(pics, props);
        pics = pics.map((item, idx, arr) => {
            let capv = idx == arr.length - 1 ? 0 : props.cap;
            let key = idx;
            return item.map((item, idx, arr) => {
                let caph = idx == arr.length - 1 ? 0 : props.cap;
                key += "-" + idx;
                return <div key={key} style={ {background: `rgb(${[...item.bg].join(",")})`, width: item.width, height: item.height, marginRight: caph, marginBottom: capv} }></div>
            });
        }).reduce((arr, curr) => {
            return arr.concat(curr);
        }, []);
        return (
            <div className={styles.root} style={ {width: props.width + props.cap} }>
                {pics}
            </div>
        );
    }
}
