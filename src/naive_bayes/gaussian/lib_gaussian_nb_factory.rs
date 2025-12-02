use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::gaussian::{GaussianNB, GaussianNBParameters as LibGaussianNBParameters},
};

use super::factory::GaussianNBParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct GaussianNBParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub gaussian_nb_parameters: GaussianNBParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibGaussianNBFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibGaussianNBFactory {
            pub fn [<$x _ $y>](params: GaussianNBParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibGaussianNBParameters::default();
                if let Some(priors) = params.gaussian_nb_parameters.priors {
                    parameters = parameters.with_priors(priors.to_vec());
                }
                let gaussian_nb_instance = GaussianNB::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(gaussian_nb_instance))
            }
        }
    }
  };
}

create_impl! { x_type:f64, y_type:u64 }
create_impl! { x_type:f32, y_type:u64 }

create_impl! { x_type:f64, y_type:u32 }
create_impl! { x_type:f32, y_type:u32 }

create_impl! { x_type:f64, y_type:u16 }
create_impl! { x_type:f32, y_type:u16 }

create_impl! { x_type:f64, y_type:u8 }
create_impl! { x_type:f32, y_type:u8 }
