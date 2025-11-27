use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::linear::ridge_regression::RidgeRegressionSolverName as LibRidgeRegressionSolverName;

use super::{
  factory::{self, RidgeRegressionFactory, RidgeRegressionParameters},
  RidgeRegression,
};
use crate::{
  dense_matrix::DenseMatrix,
  js_number::WrappedNumber,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi]
pub enum RidgeRegressionSolverName {
  #[allow(clippy::upper_case_acronyms)]
  SVD,
  Cholesky,
}

impl From<&RidgeRegressionSolverName> for LibRidgeRegressionSolverName {
  fn from(value: &RidgeRegressionSolverName) -> Self {
    match value {
      RidgeRegressionSolverName::SVD => Self::SVD,
      RidgeRegressionSolverName::Cholesky => Self::Cholesky,
    }
  }
}

#[napi(js_name = "RidgeRegressionBuilder")]
pub struct RidgeRegressionBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) solver: Option<RidgeRegressionSolverName>,
  pub(super) alpha: Option<WrappedNumber>,
  pub(super) normalize: Option<bool>,
}

#[napi]
impl RidgeRegressionBuilder {
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
      alpha: None,
      normalize: None,
    })
  }

  #[napi]
  pub fn with_solver(&mut self, solver: RidgeRegressionSolverName) {
    self.solver = Some(solver);
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: &WrappedNumber) -> Result<()> {
    self.alpha = Some(alpha.to_owned());
    Ok(())
  }

  #[napi]
  pub fn build(&mut self) -> Result<RidgeRegression> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      ridge_regression_parameters: RidgeRegressionParameters {
        solver: self.solver.as_ref().map(LibRidgeRegressionSolverName::from),
        alpha: self.alpha.as_ref(),
        normalize: self.normalize,
      },
    };
    Ok(RidgeRegression {
      inner: RidgeRegressionFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: (&self.fit_data_y).try_into()?,
    })
  }
}
