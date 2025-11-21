use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::linear::linear_regression::LinearRegressionSolverName as LibLinearRegressionSolverName;

use super::{
  factory::{self, LinearRegressionFactory, LinearRegressionParameters},
  LinearRegression,
};
use crate::{
  dense_matrix::DenseMatrix,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi]
pub enum LinearRegressionSolverName {
  Qr,
  Svd,
}

impl From<&LinearRegressionSolverName> for LibLinearRegressionSolverName {
  fn from(value: &LinearRegressionSolverName) -> Self {
    match value {
      LinearRegressionSolverName::Qr => Self::QR,
      LinearRegressionSolverName::Svd => Self::SVD,
    }
  }
}

#[napi(js_name = "LinearRegressionBuilder")]
pub struct LinearRegressionBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) solver: Option<LinearRegressionSolverName>,
}

#[napi]
impl LinearRegressionBuilder {
  #[napi(constructor)]
  pub fn new(
    fit_data_x: Reference<DenseMatrix>,
    fit_data_y: TypedArrayWrapper,
    env: Env,
  ) -> Result<Self> {
    Ok(Self {
      fit_data_x: fit_data_x.share_with(env, Ok)?,
      fit_data_y: fit_data_y.into(),
      solver: None,
    })
  }

  #[napi]
  pub fn with_solver(&mut self, solver: LinearRegressionSolverName) {
    self.solver = Some(solver);
  }

  #[napi]
  pub fn build(&mut self) -> Result<LinearRegression> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      linear_regression_parameters: LinearRegressionParameters {
        solver: self
          .solver
          .as_ref()
          .map(LibLinearRegressionSolverName::from),
      },
    };
    Ok(LinearRegression {
      inner: LinearRegressionFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: (&self.fit_data_y).try_into()?,
    })
  }
}
