use bincode::{Decode, Encode};
use napi::{Error, Result, Status};
use napi_derive::napi;

use crate::typed_array::TypedArrayType;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum SVCPredictOutputType {
  I64,
  #[default]
  I32,
}

impl TryFrom<TypedArrayType> for SVCPredictOutputType {
  type Error = napi::Error;

  fn try_from(value: TypedArrayType) -> Result<Self> {
    match value {
      TypedArrayType::I64 => Ok(Self::I64),
      TypedArrayType::I32 => Ok(Self::I32),
      TypedArrayType::F64
      | TypedArrayType::F32
      | TypedArrayType::U64
      | TypedArrayType::U32
      | TypedArrayType::U16
      | TypedArrayType::U8 => Err(Error::new(
        Status::GenericFailure,
        "Supported types for fit data y are: i64 and i32.",
      )),
    }
  }
}
