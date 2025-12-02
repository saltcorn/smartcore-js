use bincode::{Decode, Encode};
use napi::{Error, Status};
use napi_derive::napi;

use crate::typed_array::TypedArrayType;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum BernoulliNBPredictOutputType {
  #[default]
  U32,
  U64,
}

impl TryFrom<TypedArrayType> for BernoulliNBPredictOutputType {
  type Error = Error;

  fn try_from(value: TypedArrayType) -> Result<Self, Self::Error> {
    match value {
      TypedArrayType::U64 => Ok(Self::U64),
      TypedArrayType::U32 => Ok(Self::U32),
      TypedArrayType::U16
      | TypedArrayType::U8
      | TypedArrayType::F64
      | TypedArrayType::F32
      | TypedArrayType::I64
      | TypedArrayType::I32 => Err(Error::new(
        Status::GenericFailure,
        "Supported types for fit data y are: u64, and u32.",
      )),
    }
  }
}
