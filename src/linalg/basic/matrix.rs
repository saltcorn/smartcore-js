use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use smartcore::{
  decomposition::pca::{PCAParameters as LibPCAParameters, PCA as LibPCA},
  linalg::basic::matrix::DenseMatrix,
};

#[napi]
pub struct F64DenseMatrix {
  inner: DenseMatrix<f64>,
}

#[napi]
impl F64DenseMatrix {
  #[napi(constructor)]
  pub fn new(
    nrows: u32,
    ncols: u32,
    values: Float64Array,
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
    Ok(F64DenseMatrix { inner: matrix })
  }

  pub fn from_inner(inner: DenseMatrix<f64>) -> Self {
    F64DenseMatrix { inner }
  }

  #[napi]
  pub fn noop(&self) {}
}

impl Deref for F64DenseMatrix {
  type Target = DenseMatrix<f64>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
