use napi::bindgen_prelude::*;
use napi_derive::napi;

#[napi]
pub enum TypedArray {
  F32(Float32Array),
  F64(Float64Array),
  U64(BigUint64Array),
  U32(Uint32Array),
  U16(Uint16Array),
  U8(Uint8Array),
  I64(BigInt64Array),
  I32(Int32Array),
  I16(Int16Array),
  I8(Int8Array),
}

#[napi]
impl TypedArray {
  #[napi(factory)]
  fn f32(v: Float32Array) -> Self {
    Self::F32(v)
  }
}
