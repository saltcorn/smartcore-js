"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePipeline = makePipeline;
const pipeline_js_1 = require("./pipeline.js");
function makePipeline(steps) {
    return new pipeline_js_1.Pipeline(steps);
}
