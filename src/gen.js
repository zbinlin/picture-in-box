"use strict";

const COLOURS = [
["长春红",[25,70,53,0]],
["檀红",[37,66,58,0]],
["豆沙色",[48,78,66,10]],
["茶色",[37,75,76,1]],
["绛紫",[53,84,57,8]],
["苍黄",[44,38,53,0]],
["驼色",[42,52,64,0]],
["秋色",[53,59,88,8]],
["赫色",[47,74,83,0]],
["松柏绿",[80,55,79,20]],
["柳绿",[56,24,65,0]],
["竹青",[61,36,70,0]],
["苍翠",[71,26,64,0]],
["黛绿",[79,56,58,8]],
["铜绿",[70,30,50,5]],
["苍青",[61,35,28,0]],
["黛蓝",[82,72,50,11]],
["鸦青",[82,70,50,11]],
["紫檀色",[62,86,88,52]],
["黛紫",[76,82,46,8]],
["黛色",[76,61,51,6]],
["煤烟色",[84,64,57,15]],
["墨色",[85,75,70,10]],
["玄青",[82,79,57,25]],
["乌色",[0,20,0,80]],
["黝色",[66,66,61,14]],
["缁色",[69,78,73,44]],
["黧色",[66,64,78,25]],
["皂色",[90,85,70,70]],
["漆黑",[89,87,76,61]],
["苍色",[61,43,43,0]],
["铅色",[63,52,47,0]],
["灰鼠色",[53,43,40,0]],
["墨灰",[0,0,0,75]],
];

function normalize(num, min = 0, max = 100) {
    return Math.max(min, Math.min(max, Math.round(num * (max - min) + min)));
}
function cmyk2rgb(cmyk) {
    let [cyan, magenta, yellow, black] = cmyk;
    cyan /= 100;
    magenta /= 100;
    yellow /= 100;
    black /= 100;
    let temp = 1 - black;
    let red = 1 - Math.min(1, cyan * temp + black);
    let green = 1 - Math.min(1, magenta * temp + black);
    let blue = 1 - Math.min(1, yellow * temp + black);
    return [normalize(red, 0, 255), normalize(green, 0, 255), normalize(blue, 0, 255)];
}
function rgb2cmyk(rgb) {
    let [red, green, blue] = rgb;
    red /= 255;
    green /= 255;
    blue /= 255;
    let black = 1 - Math.max(red, green, blue);
    if (black == 1) {
        return [0, 0, 0, 100];
    }
    let temp = 1 - black;
    let cyan = (temp - red) / temp;
    let magenta = (temp - green) / temp;
    let yellow = (temp - blue) / temp;
    return [normalize(cyan), normalize(magenta), normalize(yellow), normalize(black)];
}


function getColor() {
    return cmyk2rgb(COLOURS[Math.floor(Math.random() * COLOURS.length)][1]);
}

export default function get(obj) {
    const MAX_ASPECT = obj.width / obj.minHeight;
    let arr = [];
    let num = +obj.pics || 0;
    for (let i = 0; i < num; i++) {
        let aspect = Math.random() * MAX_ASPECT;
        let w = Math.floor(Math.random() * 1000) + 50;
        let h = Math.floor(w / aspect);
        arr.push({
            width: w,
            height: h,
            aspect: w / h,
            bg: getColor()
        });
    }
    return arr;
}
