use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use smartcore::linalg::basic::matrix::DenseMatrix;

#[napi]
pub struct F32DenseMatrix {
  inner: DenseMatrix<f32>,
}

#[napi]
impl F32DenseMatrix {
  #[napi(constructor)]
  pub fn new(
    nrows: u32,
    ncols: u32,
    values: Float32Array,
    column_major: Option<bool>,
  ) -> Result<Self> {
    let column_major = column_major.unwrap_or(true);
    let matrix = DenseMatrix::new(
      nrows as usize,
      ncols as usize,
      values.to_vec(),
      column_major,
    )
    .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
    Ok(F32DenseMatrix { inner: matrix })
  }

  pub fn from_inner(inner: DenseMatrix<f32>) -> Self {
    F32DenseMatrix { inner }
  }

  #[napi]
  pub fn noop(&self) {}
}

impl Deref for F32DenseMatrix {
  type Target = DenseMatrix<f32>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
