"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializePipeline = void 0;
exports.makePipeline = makePipeline;
const pipeline_js_1 = require("./pipeline.js");
function makePipeline(steps, config) {
    return new pipeline_js_1.Pipeline(steps, config);
}
const deserializePipeline = pipeline_js_1.Pipeline.deserialize;
exports.deserializePipeline = deserializePipeline;
