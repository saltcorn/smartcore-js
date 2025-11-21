use bincode::{Decode, Encode};
use napi::{Error, Result, Status};
use napi_derive::napi;

use crate::typed_array::TypedArrayVec;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Encode, Decode)]
#[napi(string_enum)]
pub enum RandomForestClassifierPredictOutputType {
  I64,
  U64,
  I32,
}

impl TryFrom<&TypedArrayVec> for RandomForestClassifierPredictOutputType {
  type Error = napi::Error;

  fn try_from(value: &TypedArrayVec) -> Result<Self> {
    match value {
      TypedArrayVec::I64(_) => Ok(Self::I64),
      TypedArrayVec::U64(_) => Ok(Self::U64),
      TypedArrayVec::I32(_) => Ok(Self::I32),
      TypedArrayVec::U32(_) | TypedArrayVec::F32(_) | TypedArrayVec::F64(_) => Err(Error::new(
        Status::GenericFailure,
        "RandomForestClassifier supported predict output types are i64, u64, and i32.",
      )),
    }
  }
}
