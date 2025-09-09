use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::{
  api::SupervisedEstimator,
  linalg::basic::matrix::DenseMatrix,
  linear::ridge_regression::{
    RidgeRegression as LibRidgeRegression,
    RidgeRegressionParameters as LibRidgeRegressionParameters,
    RidgeRegressionSolverName as LibRidgeRegressionSolverName,
  },
};

use crate::linalg::basic::matrix::F32DenseMatrix;

#[napi]
pub struct RidgeRegressionF32 {
  inner: LibRidgeRegression<f32, f32, DenseMatrix<f32>, Vec<f32>>,
}

impl Default for RidgeRegressionF32 {
  fn default() -> Self {
    Self {
      inner: LibRidgeRegression::<f32, f32, DenseMatrix<f32>, Vec<f32>>::new(),
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
    y: Float32Array,
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

  #[napi]
  pub fn predict(&self, x: &F32DenseMatrix) -> Result<Float32Array> {
    let prediction_result = self
      .inner
      .predict(x as &DenseMatrix<f32>)
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
    Ok(Float32Array::new(prediction_result))
  }
}

#[napi]
#[derive(Debug, Default)]
pub struct RidgeRegressionParameters {
  inner: LibRidgeRegressionParameters<f32>,
}

impl Deref for RidgeRegressionParameters {
  type Target = LibRidgeRegressionParameters<f32>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}

#[napi]
impl RidgeRegressionParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: LibRidgeRegressionParameters::<f32>::default(),
    }
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: f64) {
    self.inner = self.inner.clone().with_alpha(alpha as f32)
  }

  #[napi]
  pub fn with_normalize(&mut self, normalize: bool) {
    self.inner = self.inner.clone().with_normalize(normalize)
  }

  #[napi]
  pub fn with_solver(&mut self, solver: RidgeRegressionSolverName) {
    self.inner = match solver {
      RidgeRegressionSolverName::Cholesky => self
        .inner
        .clone()
        .with_solver(LibRidgeRegressionSolverName::Cholesky),
      RidgeRegressionSolverName::SVD => self
        .inner
        .clone()
        .with_solver(LibRidgeRegressionSolverName::SVD),
    };
  }
}

#[napi]
pub enum RidgeRegressionSolverName {
  Cholesky,
  SVD,
}
