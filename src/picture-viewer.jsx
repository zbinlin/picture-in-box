"use strict";

import React, { Component } from "react";

import gen from "./gen";
import picturePacker from "./picture-picker";

import styles from "./picture-viewer.scss";

export default class PictureViewer extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this._tid) {
            return false;
        } else {
            clearTimeout(this._tid);
            this._tid = setTimeout(() => {
                this._tid = 0;
            }, 300);
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
                let styl = {
                    background: `rgb(${[...item.bg].join(",")})`,
                    width: item.width,
                    height: item.height,
                    marginRight: caph,
                    marginBottom: capv
                };
                return <div key={key} data-original-width={item.originalWidth}
                            data-original-height={item.originalHeight}
                            style={styl}></div>
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
