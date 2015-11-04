"use strict";

const path = require("path");
const fs = require("fs");

const pwd = process.cwd();
const SRC = path.join(pwd, "./src/index.html");
const DST = path.join(pwd, "./dist");

fs.access(DST, fs.R_OK, function (err) {
    if (err) {
        fs.mkdirSync(DST);
    }
    copy(SRC, DST);
});

function copy(file, dst) {
    let filename = path.basename(file);
    if (path.basename(dst) != filename) {
        dst = path.join(dst, filename);
    }
    return new Promise(function (resolve, reject) {
        fs.createReadStream(file).pipe(fs.createWriteStream(dst))
          .on("finish", function () {
              resolve();
          })
          .on("error", function (err) {
              reject(err);
          });
    });
}
