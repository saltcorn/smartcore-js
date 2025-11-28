use bincode::{Decode, Encode};
use napi::{Error, Result, Status};
use napi_derive::napi;

use crate::typed_array::TypedArrayType;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum ExtraTreesRegressorPredictOutputType {
  F64,
  #[default]
  F32,
  I64,
  U64,
  I32,
}

impl TryFrom<TypedArrayType> for ExtraTreesRegressorPredictOutputType {
  type Error = napi::Error;

  fn try_from(value: TypedArrayType) -> Result<Self> {
    match value {
      TypedArrayType::F64 => Ok(Self::F64),
      TypedArrayType::F32 => Ok(Self::F32),
      TypedArrayType::I64 => Ok(Self::I64),
      TypedArrayType::U64 => Ok(Self::U64),
      TypedArrayType::I32 => Ok(Self::I32),
      TypedArrayType::U32 | TypedArrayType::U16 | TypedArrayType::U8 => Err(Error::new(
        Status::GenericFailure,
        "Supported types for fit data y are: f64, f32, i64, u64, and i32.",
      )),
    }
  }
}
