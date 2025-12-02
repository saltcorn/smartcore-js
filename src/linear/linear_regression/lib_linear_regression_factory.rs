use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::linear_regression::{
    LinearRegression, LinearRegressionParameters as LibLinearRegressionParameters,
  },
};

use super::factory::LinearRegressionParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct LinearRegressionParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub linear_regression_parameters: LinearRegressionParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibLinearRegressionFactory {}

macro_rules! create_impl {
    (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibLinearRegressionFactory {
            pub fn [<$x _ $y>](params: LinearRegressionParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibLinearRegressionParameters::default();
                if let Some(solver) = params.linear_regression_parameters.solver {
                    parameters = parameters.with_solver(solver);
                }

                let linear_regression_instance = LinearRegression::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(linear_regression_instance))
            }
        }
    }
  };
}

create_impl! { x_type:f32, y_type:f64 }
create_impl! { x_type:f64, y_type:f64 }

create_impl! { x_type:f32, y_type:f32 }
create_impl! { x_type:f64, y_type:f32 }

create_impl! { x_type:f32, y_type:i64 }
create_impl! { x_type:f64, y_type:i64 }

create_impl! { x_type:f32, y_type:u64 }
create_impl! { x_type:f64, y_type:u64 }

create_impl! { x_type:f32, y_type:i32 }
create_impl! { x_type:f64, y_type:i32 }
