use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::logistic_regression::{
    LogisticRegression, LogisticRegressionParameters as LibLogisticRegressionParameters,
  },
};

use super::factory::LogisticRegressionParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct LogisticRegressionParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub logistic_regression_parameters: LogisticRegressionParameters<'a>,
}

#[derive(Debug, Clone, Default)]
pub struct LibLogisticRegressionFactory {}

macro_rules! create_impl {
    (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibLogisticRegressionFactory {
            pub fn [<$x _ $y>](params: LogisticRegressionParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibLogisticRegressionParameters::default();
                if let Some(solver) = params.logistic_regression_parameters.solver {
                    parameters = parameters.with_solver(solver);
                }
                if let Some(alpha) = params.logistic_regression_parameters.alpha {
                    parameters = parameters.with_alpha(alpha.try_into()?)
                }

                let logistic_regression_instance = LogisticRegression::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(logistic_regression_instance))
            }
        }
    }
  };
}

create_impl! { x_type:f32, y_type:i64 }
create_impl! { x_type:f64, y_type:i64 }

create_impl! { x_type:f32, y_type:u64 }
create_impl! { x_type:f64, y_type:u64 }

create_impl! { x_type:f32, y_type:i32 }
create_impl! { x_type:f64, y_type:i32 }
