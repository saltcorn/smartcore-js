use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::linear::logistic_regression::LogisticRegressionSolverName as LibLogisticRegressionSolverName;

use super::{
  factory::{self, LogisticRegressionFactory, LogisticRegressionParameters},
  LogisticRegression,
};
use crate::{
  dense_matrix::DenseMatrix,
  js_number::WrappedNumber,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi]
pub enum LogisticRegressionSolverName {
  #[allow(clippy::upper_case_acronyms)]
  LBFGS,
}

impl From<&LogisticRegressionSolverName> for LibLogisticRegressionSolverName {
  fn from(value: &LogisticRegressionSolverName) -> Self {
    match value {
      LogisticRegressionSolverName::LBFGS => Self::LBFGS,
    }
  }
}

#[napi(js_name = "LogisticRegressionBuilder")]
pub struct LogisticRegressionBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) solver: Option<LogisticRegressionSolverName>,
  pub(super) alpha: Option<WrappedNumber>,
}

#[napi]
impl LogisticRegressionBuilder {
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
    })
  }

  #[napi]
  pub fn with_solver(&mut self, solver: LogisticRegressionSolverName) {
    self.solver = Some(solver);
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: &WrappedNumber) {
    self.alpha = Some(alpha.to_owned());
  }

  #[napi]
  pub fn build(&mut self) -> Result<LogisticRegression> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      logistic_regression_parameters: LogisticRegressionParameters {
        solver: self
          .solver
          .as_ref()
          .map(LibLogisticRegressionSolverName::from),
        alpha: self.alpha.as_ref(),
      },
    };
    Ok(LogisticRegression {
      inner: LogisticRegressionFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.fit_data_y.r#type().try_into()?,
    })
  }
}
