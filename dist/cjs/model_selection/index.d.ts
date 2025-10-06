import type { XType, YType } from '../index.js';
interface TrainTestSplitParams {
    testSize: number;
    shuffle?: boolean;
    seed?: bigint;
}
declare function trainTestSplit(x: XType, y: YType, params: TrainTestSplitParams): [XType, XType, YType, YType];
export { trainTestSplit };
