use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{DenseMatrix, DenseMatrixInner};
use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};

#[napi]
pub struct DenseMatrixRef {
  inner: SharedReference<DenseMatrix, DenseMatrixRefInner<'static>>,
}

pub enum DenseMatrixRefInner<'a> {
  F64(&'a DenseMatrixF64),
  F32(&'a DenseMatrixF32),
  U64(&'a DenseMatrixU64),
  U32(&'a DenseMatrixU32),
  U16(&'a DenseMatrixU16),
  U8(&'a DenseMatrixU8),
  I64(&'a DenseMatrixI64),
  I32(&'a DenseMatrixI32),
}

impl DenseMatrixRef {
  pub fn new(value: Reference<DenseMatrix>, env: Env) -> Result<Self> {
    let inner = value.share_with(env, |dm| {
      Ok(match &dm.inner {
        DenseMatrixInner::F64(dense_matrix_f64) => DenseMatrixRefInner::F64(dense_matrix_f64),
        DenseMatrixInner::F32(dense_matrix_f32) => DenseMatrixRefInner::F32(dense_matrix_f32),
        DenseMatrixInner::U64(dense_matrix_u64) => DenseMatrixRefInner::U64(dense_matrix_u64),
        DenseMatrixInner::U32(dense_matrix_u32) => DenseMatrixRefInner::U32(dense_matrix_u32),
        DenseMatrixInner::U16(dense_matrix_u16) => DenseMatrixRefInner::U16(dense_matrix_u16),
        DenseMatrixInner::U8(dense_matrix_u8) => DenseMatrixRefInner::U8(dense_matrix_u8),
        DenseMatrixInner::I64(dense_matrix_i64) => DenseMatrixRefInner::I64(dense_matrix_i64),
        DenseMatrixInner::I32(dense_matrix_i32) => DenseMatrixRefInner::I32(dense_matrix_i32),
      })
    })?;
    Ok(Self { inner })
  }
}
