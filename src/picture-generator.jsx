"use strict";

import React, { Component } from "react";

import Slider from "./slider";

import styles from "./picture-generator.scss";

export default class PictureGenerator extends Component {
    render() {
        let props = this.props;
        return (
            <div className={styles.root}>
                <Slider id="viewer-width-range" onChange={props.onChange.bind(null, "width")} label="视图宽度：" min="300" max="1280" step="10" value={props.width} />
                <Slider id="viewer-pics-range" onChange={props.onChange.bind(null, "pics")} label="图片数量：" min="20" max="50" step="1" value={props.pics} />
                <Slider id="viewer-cap-range" onChange={props.onChange.bind(null, "cap")} label="图片间距：" min="0" max="20" step="5" value={props.cap} />
                <Slider id="viewer-min-height-range" onChange={props.onChange.bind(null, "minHeight")} label="最小高度：" min="100" max="300" step="10" value={props.minHeight} />
                <Slider id="viewer-max-height-range" onChange={props.onChange.bind(null, "maxHeight")} label="最大高度：" min="200" max="400" step="10" value={props.maxHeight} />
                <Slider id="viewer-optimal-height-range" onChange={props.onChange.bind(null, "optimalHeight")} label="最优高度：" min="100" max="400" step="10" value={props.optimalHeight} />
                <Slider id="viewer-column-range" onChange={props.onChange.bind(null, "cols")} label="最大列数：" min="3" max="7" step="1" value={props.cols} />
            </div>
        );
    }
}
