use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;

#[napi]
pub enum TypedArrayWrapper {
  F64(Float64Array),
  F32(Float32Array),
  I64(BigInt64Array),
  U64(BigUint64Array),
  I32(Int32Array),
  U32(Uint32Array),
  U16(Uint16Array),
  U8(Uint8Array),
}

macro_rules! from_vec_impl {
  ($inner:ty) => {
    paste! {
        impl From<Vec<$inner>> for TypedArrayWrapper {
            fn from(value: Vec<$inner>) -> Self {
                Self::[<$inner:upper>](value.into())
            }
        }

        impl<'a> TryFrom<&'a TypedArrayVec> for &'a Vec<$inner> {
            type Error = Error;

            fn try_from(value: &'a TypedArrayVec) -> Result<Self> {
                match value {
                    TypedArrayVec::[<$inner:upper>](v) => Ok(&v),
                    _ => Err(Error::new(
                        Status::GenericFailure,
                        stringify!("Expected an "[<$inner:upper>]" variant of TypedArray!")
                    )),
                }
            }
        }
    }
  };
}

from_vec_impl! { f64 }
from_vec_impl! { f32 }
from_vec_impl! { i64 }
from_vec_impl! { u64 }
from_vec_impl! { i32 }
from_vec_impl! { u32 }
from_vec_impl! { u16 }
from_vec_impl! { u8 }

pub enum TypedArrayVec {
  F64(Vec<f64>),
  F32(Vec<f32>),
  I64(Vec<i64>),
  U64(Vec<u64>),
  I32(Vec<i32>),
  U32(Vec<u32>),
  U16(Vec<u16>),
  U8(Vec<u8>),
}

impl From<TypedArrayWrapper> for TypedArrayVec {
  fn from(value: TypedArrayWrapper) -> Self {
    match value {
      TypedArrayWrapper::F64(float64_array) => Self::F64(float64_array.to_vec()),
      TypedArrayWrapper::F32(float32_array) => Self::F32(float32_array.to_vec()),
      TypedArrayWrapper::I64(big_int64_array) => Self::I64(big_int64_array.to_vec()),
      TypedArrayWrapper::U64(big_uint64_array) => Self::U64(big_uint64_array.to_vec()),
      TypedArrayWrapper::I32(int32_array) => Self::I32(int32_array.to_vec()),
      TypedArrayWrapper::U32(uint32_array) => Self::U32(uint32_array.to_vec()),
      TypedArrayWrapper::U16(uint16_array) => Self::U16(uint16_array.to_vec()),
      TypedArrayWrapper::U8(uint8_array) => Self::U8(uint8_array.to_vec()),
    }
  }
}

#[napi(string_enum)]
pub enum TypedArrayType {
  F64,
  F32,
  I64,
  U64,
  I32,
  U32,
  U16,
  U8,
}

impl From<TypedArrayWrapper> for TypedArrayType {
  fn from(value: TypedArrayWrapper) -> Self {
    match value {
      TypedArrayWrapper::F32(_) => Self::F32,
      TypedArrayWrapper::F64(_) => Self::F64,
      TypedArrayWrapper::I64(_) => Self::I64,
      TypedArrayWrapper::U64(_) => Self::U32,
      TypedArrayWrapper::I32(_) => Self::I32,
      TypedArrayWrapper::U32(_) => Self::U32,
      TypedArrayWrapper::U16(_) => Self::U16,
      TypedArrayWrapper::U8(_) => Self::U8,
    }
  }
}
