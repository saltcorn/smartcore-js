mod dense_matrix_type;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};
pub use dense_matrix_type::{DenseMatrixType, DenseMatrixTypeVariantName};

#[napi]
pub struct DenseMatrix {
  inner: DenseMatrixType,
}

#[napi]
impl DenseMatrix {
  #[napi(factory)]
  pub fn f64(x: Reference<DenseMatrixF64>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::F64(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn f32(x: Reference<DenseMatrixF32>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::F32(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u64(x: Reference<DenseMatrixU64>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U64(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u32(x: Reference<DenseMatrixU32>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U32(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u16(x: Reference<DenseMatrixU16>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U16(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u8(x: Reference<DenseMatrixU8>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U8(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn i64(x: Reference<DenseMatrixI64>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::I64(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn i32(x: Reference<DenseMatrixI32>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::I32(x.share_with(env, Ok)?),
    })
  }

  pub fn inner(&self) -> &DenseMatrixType {
    &self.inner
  }

  pub fn inner_variant_same(&self, other: &DenseMatrix) -> bool {
    self.inner().variant_is_same(other.inner())
  }
}
