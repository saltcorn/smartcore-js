import { Pipeline } from './pipeline.js';
function makePipeline(steps) {
    return new Pipeline(steps);
}
export { makePipeline };
