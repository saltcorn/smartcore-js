import { Pipeline } from './pipeline.js';
function makePipeline(steps, config) {
    return new Pipeline(steps, config);
}
export { makePipeline };
