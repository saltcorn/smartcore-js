"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANI32MinkowskiI32Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new index_js_2.DBSCANI32EuclidianI32Parameters().withDistanceMinkowskiI32(new index_js_2.MinkowskiI32(config.p));
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI32 = index_js_1.converters.toDenseMatrixI32(x);
        return index_js_2.DBSCANI32I32MinkowskiI32.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixI32(x);
    }
    deserialize(data) {
        return index_js_2.DBSCANI32I32MinkowskiI32.deserialize(data);
    }
}
exports.default = DBSCANI32MinkowskiI32Provider;
