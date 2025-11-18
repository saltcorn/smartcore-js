mod dense_matrix_type;
mod from_impl;
mod try_from_impl;

use napi_derive::napi;

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};
pub use dense_matrix_type::DenseMatrixType;

#[napi(js_name = "DenseMatrix")]
pub struct DenseMatrix {
  inner: DenseMatrixInner,
}

// Comes after DenseMatrix napi's macro is expanded
mod factory;

#[napi]
impl DenseMatrix {
  #[napi(js_name = "type")]
  pub fn _type(&mut self) -> DenseMatrixType {
    self.r#type()
  }

  pub fn r#type(&self) -> DenseMatrixType {
    self.inner.r#type()
  }
}

pub enum DenseMatrixInner {
  F64(DenseMatrixF64),
  F32(DenseMatrixF32),
  U64(DenseMatrixU64),
  U32(DenseMatrixU32),
  U16(DenseMatrixU16),
  U8(DenseMatrixU8),
  I64(DenseMatrixI64),
  I32(DenseMatrixI32),
}

impl From<DenseMatrixInner> for DenseMatrix {
  fn from(value: DenseMatrixInner) -> Self {
    Self { inner: value }
  }
}

impl DenseMatrixInner {
  pub fn r#type(&self) -> DenseMatrixType {
    match self {
      DenseMatrixInner::F64(_) => DenseMatrixType::F64,
      DenseMatrixInner::F32(_) => DenseMatrixType::F32,
      DenseMatrixInner::U64(_) => DenseMatrixType::U64,
      DenseMatrixInner::U32(_) => DenseMatrixType::U32,
      DenseMatrixInner::U16(_) => DenseMatrixType::U16,
      DenseMatrixInner::U8(_) => DenseMatrixType::U8,
      DenseMatrixInner::I64(_) => DenseMatrixType::I64,
      DenseMatrixInner::I32(_) => DenseMatrixType::I32,
    }
  }
}
