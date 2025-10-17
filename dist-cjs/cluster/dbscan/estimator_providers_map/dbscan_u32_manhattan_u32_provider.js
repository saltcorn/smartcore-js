"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU32ManhattanU32Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANU32EuclidianU32Parameters().withDistanceManhattanU32(new index_js_1.ManhattanU32());
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU32 = x.asRsMatrix('u32');
        return index_js_1.DBSCANU32I32ManhattanU32.fit(xAsU32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('u32');
    }
    deserialize(data) {
        return index_js_1.DBSCANU32I32ManhattanU32.deserialize(data);
    }
}
exports.default = DBSCANU32ManhattanU32Provider;
