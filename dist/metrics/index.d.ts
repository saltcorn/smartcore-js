type YType = number[] | Float64Array | BigInt64Array;
declare function accuracyScore(yTrue: YType, yPred: YType): number;
export { accuracyScore };
