use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::lasso::{Lasso, LassoParameters as LibLassoParameters},
};

use super::factory::LassoParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct LassoParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub lasso_parameters: LassoParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibLassoFactory {}

macro_rules! create_impl {
    (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibLassoFactory {
            pub fn [<$x _ $y>](params: LassoParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibLassoParameters::default();
                if let Some(alpha) = params.lasso_parameters.alpha {
                    parameters = parameters.with_alpha(alpha);
                }
                if let Some(normalize) = params.lasso_parameters.normalize {
                    parameters = parameters.with_normalize(normalize);
                }
                if let Some(tol) = params.lasso_parameters.tol {
                    parameters = parameters.with_tol(tol);
                }
                if let Some(max_iter) = params.lasso_parameters.max_iter {
                    parameters = parameters.with_max_iter(max_iter);
                }

                let lasso_instance = Lasso::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(lasso_instance))
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
