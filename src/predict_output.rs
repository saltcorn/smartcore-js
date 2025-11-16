use napi::bindgen_prelude::{BigInt64Array, Error, Int32Array};
use napi_derive::napi;

#[napi]
pub enum PredictOutput {
  Int32Array(Int32Array),
  BigInt64Array(BigInt64Array),
}

impl TryFrom<PredictOutput> for Int32Array {
  type Error = Error;

  fn try_from(value: PredictOutput) -> Result<Self, Self::Error> {
    match value {
      PredictOutput::Int32Array(inner) => Ok(inner),
      _ => unimplemented!(),
    }
  }
}

impl From<Vec<i32>> for PredictOutput {
  fn from(value: Vec<i32>) -> Self {
    Self::Int32Array(Int32Array::from(value))
  }
}

impl From<Vec<i64>> for PredictOutput {
  fn from(value: Vec<i64>) -> Self {
    Self::BigInt64Array(BigInt64Array::from(value))
  }
}
