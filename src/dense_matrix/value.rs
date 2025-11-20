use napi::bindgen_prelude::BigInt;
use napi_derive::napi;

#[napi]
pub enum DenseMatrixValue {
  F64(f64),
  Big(BigInt),
  U32(u32),
  I32(i32),
}

impl From<f64> for DenseMatrixValue {
  fn from(value: f64) -> Self {
    Self::F64(value)
  }
}

impl From<f32> for DenseMatrixValue {
  fn from(value: f32) -> Self {
    Self::F64(value as f64)
  }
}

impl From<u64> for DenseMatrixValue {
  fn from(value: u64) -> Self {
    Self::Big(value.into())
  }
}

impl From<u32> for DenseMatrixValue {
  fn from(value: u32) -> Self {
    Self::U32(value)
  }
}

impl From<u16> for DenseMatrixValue {
  fn from(value: u16) -> Self {
    Self::U32(value as u32)
  }
}

impl From<u8> for DenseMatrixValue {
  fn from(value: u8) -> Self {
    Self::U32(value as u32)
  }
}

impl From<i64> for DenseMatrixValue {
  fn from(value: i64) -> Self {
    Self::Big(value.into())
  }
}

impl From<i32> for DenseMatrixValue {
  fn from(value: i32) -> Self {
    Self::I32(value)
  }
}
