use bincode::{Decode, Encode};
use napi::{Error, Status};
use napi_derive::napi;

use crate::typed_array::TypedArrayType;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum KNNClassifierPredictOutputType {
  #[default]
  I32,
}

impl TryFrom<TypedArrayType> for KNNClassifierPredictOutputType {
  type Error = Error;

  fn try_from(value: TypedArrayType) -> Result<Self, Self::Error> {
    match value {
      TypedArrayType::I32 => Ok(Self::I32),
      TypedArrayType::U64
      | TypedArrayType::U32
      | TypedArrayType::U16
      | TypedArrayType::U8
      | TypedArrayType::F64
      | TypedArrayType::F32
      | TypedArrayType::I64 => Err(Error::new(
        Status::GenericFailure,
        "Supported types for fit data y are: i32",
      )),
    }
  }
}
