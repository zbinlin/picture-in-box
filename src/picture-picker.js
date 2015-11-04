"use strict";

export default function picturePacker(pics, meta) {
    let width = meta.width;
    let cap = meta.cap;
    let minHeight = meta.minHeight;
    let maxHeight = meta.maxHeight;
    let optimalHeight = meta.optimalHeight;
    let minAspect = width / maxHeight;
    let maxAspect = width / minHeight;
    let maxSet =  (optimalHeight - minHeight) / (maxHeight - optimalHeight);
    let optimalAspect = width / optimalHeight;
    let cols = meta.cols;

    let npics = [];

    for (let i = 0; i < pics.length; i++) {
        let ss = pics.slice(i, i + cols);
        let minH = Math.min(...ss.map(a => a.height));
        let sh = [];
        let dw = 0;
        let da = 0;
        for (let i = 0; i < ss.length; i++) {
            let pic = ss[i];
            let pw = pic.width;
            let ph = pic.height;
            let pa = pic.aspect;
            let cap = cap * i;
            dw += minH * pa;
            da += pa;
            sh.push([ss.slice(0, i + 1), (width - dw - da) / da]);
        }
        let rst = sh.map((da, idx) => {
            let pics = da[0];
            let pdh = da[1];
            let h = minH + pdh;
            let at = (h > optimalHeight ? (2 * optimalHeight - h) * maxSet : h) / optimalHeight;

            return [at, pics.map(pic => {
                let pw = pic.width;
                let ph = pic.height;
                let bg = pic.bg;
                let pa = pic.aspect;
                let w = h * pa;
                return {
                    width: w,
                    height: h,
                    bg: bg
                };
            })];
        });
        let bestIndex = rst.findIndex(item => item[0] == Math.max(...rst.map(item => item[0])));
        npics.push(rst[bestIndex][1]);
        i += bestIndex;
    }

    return npics;

}
