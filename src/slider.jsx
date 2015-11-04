"use strict";

import React, { Component } from "react";

import styles from "./slider.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class Slider extends Component {
    onChange(evt) {
        let value = evt.target.value;
        if (this.props.value != value) {
            this.props.onChange(value);
        }
    }

    render() {
        let props = this.props;
        return (
            <div className={styles.root}>
                <label htmlFor={props.id}>
                    <span className={styles.text}>{props.label}</span>
                    <input className={cx("text", "range")} id={props.id} onChange={this.onChange.bind(this)}
                           type="range" step={props.step} min={props.min} max={props.max} defaultValue={props.value} />
                    <span className={styles.text}>{props.value}</span>
                </label>
            </div>
        )
    }

}

Slider.defaultProps = {
    label: "",
    id: "",
    step: 1,
    min: 0,
    max: 100,
    value: 50,
    onChange: function (val) {
        console.log(`Changed, new value: ${val}`);
    }
};

export default Slider;
