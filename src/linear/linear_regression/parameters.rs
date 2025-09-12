use std::ops::Deref;

use napi_derive::napi;
use smartcore::linear::linear_regression::{
  LinearRegressionParameters as LibLinearRegressionParameters,
  LinearRegressionSolverName as LibLinearRegressionSolverName,
};

#[napi]
pub enum LinearRegressionSolverName {
  Qr,
  Svd,
}

#[napi]
#[derive(Debug, Clone, Default)]
pub struct LinearRegressionParameters {
  inner: LibLinearRegressionParameters,
}

#[napi]
impl LinearRegressionParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: LibLinearRegressionParameters::default(),
    }
  }

  #[napi]
  pub fn with_solver(&mut self, solver: LinearRegressionSolverName) {
    self.inner = match solver {
      LinearRegressionSolverName::Qr => self
        .inner
        .clone()
        .with_solver(LibLinearRegressionSolverName::QR),
      LinearRegressionSolverName::Svd => self
        .inner
        .clone()
        .with_solver(LibLinearRegressionSolverName::SVD),
    };
  }
}

impl Deref for LinearRegressionParameters {
  type Target = LibLinearRegressionParameters;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
