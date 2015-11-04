"use strict";

export default function picturePacker(pics, meta) {
    let width = meta.width;
    let cap = meta.cap;
    let minHeight = meta.minHeight;
    let maxHeight = meta.maxHeight;
    let optimalHeight = meta.optimalHeight;
    let maxSet =  (optimalHeight - minHeight) / (maxHeight - optimalHeight);
    let cols = meta.cols;

    let npics = [];

    for (let i = 0; i < pics.length; i++) {
        let ss = pics.slice(i, i + cols);
        /**
         * 1. 取其组内图片的最小高度
         * 2. 遍历组内每张图片，根据图片的原始宽高比，计算出图片在最小高度时的宽度，将其叠加
         * 3. 叠加每张图片的原始宽高比
         * 4. 将叠加宽度减去容器宽度得到需要裁减的宽度，再除以叠加的图片的原始宽度比，得到在容器宽度内张每张图片需要裁减的高度
         * 5. 将需要最小高度减去需要裁减的高度，得到最终图片的高度
         * 6. 对比每次叠加计算出来的最终图片高度，取其最接近设定的最佳高度的一组图片
         */
        let minH = Math.min(...ss.map(a => a.height));
        let sh = [];
        let dw = 0;
        let da = 0;
        for (let i = 0; i < ss.length; i++) {
            let pic = ss[i];
            let pa = pic.aspect;
            let cw = cap * i;
            dw += minH * pa;
            da += pa;
            sh.push([ss.slice(0, i + 1), minH - (dw + cw - width) / da]);
        }
        let rst = sh.map(da => {
            let pics = da[0];
            let pdh = da[1];
            let at = (pdh > optimalHeight ? (2 * optimalHeight - pdh) * maxSet : pdh) / optimalHeight;

            return [at, pics.map(pic => {
                let pw = pic.width;
                let ph = pic.height;
                let bg = pic.bg;
                let pa = pic.aspect;
                let w = pdh * pa;
                return {
                    originalWidth: pw,
                    originalHeight: ph,
                    width: w,
                    height: pdh,
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
