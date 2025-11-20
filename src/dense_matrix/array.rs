use napi::bindgen_prelude::BigInt;

use super::value::DenseMatrixValue;

pub trait ArrayJs {
  fn shape(&self) -> (BigInt, BigInt);

  fn get(&self, pos: (BigInt, BigInt)) -> DenseMatrixValue;

  fn is_empty(&self) -> bool;
}
