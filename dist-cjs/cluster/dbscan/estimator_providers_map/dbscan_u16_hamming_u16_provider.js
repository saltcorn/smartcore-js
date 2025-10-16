"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU16HammingU16Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANU16EuclidianU16Parameters().withDistanceHammingU16(new index_js_1.HammingU16());
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU16 = x.asRsMatrix('u16');
        return index_js_1.DBSCANU16I32HammingU16.fit(xAsU16, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u16');
    }
    deserialize(data) {
        return index_js_1.DBSCANU16I32HammingU16.deserialize(data);
    }
}
exports.default = DBSCANU16HammingU16Provider;
