use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::ridge_regression::{
    RidgeRegression, RidgeRegressionParameters as LibRidgeRegressionParameters,
  },
};

use super::factory::RidgeRegressionParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct RidgeRegressionParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub ridge_regression_parameters: RidgeRegressionParameters<'a>,
}

#[derive(Debug, Clone, Default)]
pub struct LibRidgeRegressionFactory {}

macro_rules! create_impl {
    (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibRidgeRegressionFactory {
            pub fn [<$x _ $y>](params: RidgeRegressionParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibRidgeRegressionParameters::default();
                if let Some(solver) = params.ridge_regression_parameters.solver {
                    parameters = parameters.with_solver(solver);
                }
                if let Some(alpha) = params.ridge_regression_parameters.alpha {
                    parameters = parameters.with_alpha(alpha.try_into()?)
                }
                if let Some(normalize) = params.ridge_regression_parameters.normalize {
                    parameters = parameters.with_normalize(normalize);
                }

                let ridge_regression_instance = RidgeRegression::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(ridge_regression_instance))
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
