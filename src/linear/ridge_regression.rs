use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::{
  api::SupervisedEstimator,
  linalg::basic::matrix::DenseMatrix,
  linear::ridge_regression::{
    RidgeRegression as LibRidgeRegression,
    RidgeRegressionParameters as LibRidgeRegressionParameters,
  },
};

use crate::linalg::basic::matrix::F32DenseMatrix;

#[napi]
pub struct RidgeRegressionF32 {
  inner: LibRidgeRegression<f32, u32, DenseMatrix<f32>, Vec<u32>>,
}

impl Default for RidgeRegressionF32 {
  fn default() -> Self {
    Self {
      inner: LibRidgeRegression::<f32, u32, DenseMatrix<f32>, Vec<u32>>::new(),
    }
  }
}

#[napi]
impl RidgeRegressionF32 {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi(factory)]
  pub fn fit(
    x: &F32DenseMatrix,
    y: Uint32Array,
    parameters: &RidgeRegressionParameters,
  ) -> Result<Self> {
    let y = y.to_vec();
    let inner = LibRidgeRegression::fit(
      x as &DenseMatrix<f32>,
      &y,
      (parameters as &LibRidgeRegressionParameters<f32>).to_owned(),
    )
    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
    Ok(RidgeRegressionF32 { inner })
  }

  pub fn predict(&self, x: &F32DenseMatrix) -> Result<Uint32Array> {
    let prediction_result = self
      .inner
      .predict(x as &DenseMatrix<f32>)
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
    Ok(Uint32Array::new(prediction_result))
  }
}

#[napi]
pub struct RidgeRegressionParameters {
  inner: LibRidgeRegressionParameters<f32>,
}

impl Deref for RidgeRegressionParameters {
  type Target = LibRidgeRegressionParameters<f32>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
