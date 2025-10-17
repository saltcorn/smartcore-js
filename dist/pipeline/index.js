import { Pipeline } from './pipeline.js';
function makePipeline(steps, config) {
    return new Pipeline(steps, config);
}
const deserializePipeline = Pipeline.deserialize;
export { makePipeline, deserializePipeline };
