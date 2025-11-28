use bincode::{Decode, Encode};
use napi::{Error, Result, Status};
use napi_derive::napi;

use crate::typed_array::TypedArrayVec;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum LinearRegressionPredictOutputType {
  F64,
  #[default]
  F32,
  I64,
  U64,
  I32,
}

impl TryFrom<&TypedArrayVec> for LinearRegressionPredictOutputType {
  type Error = napi::Error;

  fn try_from(value: &TypedArrayVec) -> Result<Self> {
    match value {
      TypedArrayVec::F64(_) => Ok(Self::F64),
      TypedArrayVec::F32(_) => Ok(Self::F32),
      TypedArrayVec::I64(_) => Ok(Self::I64),
      TypedArrayVec::U64(_) => Ok(Self::U64),
      TypedArrayVec::I32(_) => Ok(Self::I32),
      TypedArrayVec::U32(_) | TypedArrayVec::U16(_) | TypedArrayVec::U8(_) => {
        Err(Error::new(Status::GenericFailure, "TODO"))
      }
    }
  }
}
