use bincode::{Decode, Encode};
use napi::{Error, Result, Status};
use napi_derive::napi;

use crate::typed_array::TypedArrayType;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Encode, Decode)]
#[napi(string_enum)]
pub enum RandomForestClassifierPredictOutputType {
  I64,
  U64,
  I32,
}

impl TryFrom<TypedArrayType> for RandomForestClassifierPredictOutputType {
  type Error = napi::Error;

  fn try_from(value: TypedArrayType) -> Result<Self> {
    match value {
      TypedArrayType::I64 => Ok(Self::I64),
      TypedArrayType::U64 => Ok(Self::U64),
      TypedArrayType::I32 => Ok(Self::I32),
      TypedArrayType::U32
      | TypedArrayType::F32
      | TypedArrayType::F64
      | TypedArrayType::U16
      | TypedArrayType::U8 => Err(Error::new(
        Status::GenericFailure,
        "Supported types for fit data y are: i64, u64, and i32.",
      )),
    }
  }
}
