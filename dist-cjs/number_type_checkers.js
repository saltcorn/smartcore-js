"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isF32 = isF32;
exports.isF64 = isF64;
exports.isI32 = isI32;
exports.isI64 = isI64;
exports.isU16 = isU16;
exports.isU32 = isU32;
exports.isU64 = isU64;
exports.isU8 = isU8;
exports.bigintToNumber = bigintToNumber;
exports.asF64 = asF64;
function isU8(no) {
    return Number.isInteger(no) && no >= 0 && no <= 255;
}
// function asU8(no: number | bigint): number {
//   if (!isU8(no)) {
//     throw new Error(`Expected an unsigned 8-bit integer (0 - 255). Found: ${no}.`)
//   }
//   return Number(no)
// }
function isU16(no) {
    return Number.isInteger(no) && no >= 0 && no <= 65535;
}
// function asU16(no: number | bigint): number {
//   if (!isU16(no)) {
//     throw new Error(`Expected an unsigned 16-bit integer (0 - 65535): Found: ${no}.`)
//   }
//   return Number(no)
// }
function isI32(no) {
    return Number.isInteger(no) && no >= -2147483648 && no <= 2147483647;
}
// function asI32(no: number | bigint): number {
//   if (!isI32(no)) {
//     throw new Error(`Expected a signed 32-bit integer (-2147483648 - 2147483647). Found: ${no}.`)
//   }
//   return Number(no)
// }
function isU32(no) {
    return Number.isInteger(no) && no >= 0 && no <= 4294967295;
}
// function asU32(no: number | bigint): number {
//   if (!isU32(no)) {
//     throw new Error(`Expected an unsigned 32-bit integer (0 - 4294967295). Found: ${no}.`)
//   }
//   return Number(no)
// }
function isI64(no) {
    return typeof no === 'bigint' && no >= -9223372036854775808n && no <= 9223372036854775807n;
}
// function asI64(no: number | bigint): bigint {
//   let noBig = typeof no === 'number' ? BigInt(no) : no
//   if (!isI64(noBig)) {
//     throw new Error(`Expected a number between -2^63 and 2^63-1. Found: ${no}.`)
//   }
//   return noBig
// }
function isU64(no) {
    return typeof no === 'bigint' && no >= 0n && no <= 18446744073709551615n;
}
// function asU64(no: number | bigint): bigint {
//   let noBig = typeof no === 'number' ? BigInt(no) : no
//   if (!isU64(noBig)) {
//     throw new Error(`Expected a number between 0 an 2^64-1. Found: ${no}.`)
//   }
//   return noBig
// }
function isF32(no) {
    return typeof no === 'number' && isFinite(no) && Math.abs(no) < 3.40282347e38;
}
function bigintToNumber(no) {
    let regularNo;
    if (no <= Number.MAX_VALUE)
        regularNo = Number(no);
    else
        throw new Error(`Could not represent the value ${no} as a number.`);
    return regularNo;
}
// function asF32(no: number | bigint): number {
//   let floatNo = bigintToNumber(no)
//   if (!isF32(floatNo)) {
//     throw new Error(`Expected a finite number within the F32 range. Found: ${no}.`)
//   }
//   return floatNo
// }
function isF64(no) {
    return typeof no === 'number' && isFinite(no);
}
function asF64(no) {
    let floatNo = bigintToNumber(no);
    if (!isF64(floatNo)) {
        throw new Error(`Expected a finite number. Found ${no}.`);
    }
    return floatNo;
}
