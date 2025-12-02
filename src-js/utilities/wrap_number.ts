import { WrappedNumber } from '../core-bindings/index.js'

function wrapNumber(no: number | bigint): WrappedNumber {
  if (typeof no == 'number') {
    if (Number.isInteger(no)) return WrappedNumber.int(BigInt(no))
    else return WrappedNumber.float(no)
  } else {
    return WrappedNumber.int(no)
  }
}

export { wrapNumber }
