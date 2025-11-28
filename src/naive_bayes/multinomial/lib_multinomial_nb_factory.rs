use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::multinomial::{
    MultinomialNB, MultinomialNBParameters as LibMultinomialNBParameters,
  },
};

use super::factory::MultinomialNBParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct MultinomialNBParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub multinomial_nb_parameters: MultinomialNBParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibMultinomialNBFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibMultinomialNBFactory {
            pub fn [<$x _ $y>](params: MultinomialNBParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibMultinomialNBParameters::default();
                if let Some(priors) = params.multinomial_nb_parameters.priors {
                    parameters = parameters.with_priors(priors.to_vec());
                }
                let multinomial_nb_instance = MultinomialNB::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(multinomial_nb_instance))
            }
        }
    }
  };
}

create_impl! { x_type:u64, y_type:u64 }
create_impl! { x_type:u64, y_type:u32 }
create_impl! { x_type:u64, y_type:u16 }
create_impl! { x_type:u64, y_type:u8 }

create_impl! { x_type:u32, y_type:u64 }
create_impl! { x_type:u32, y_type:u32 }
create_impl! { x_type:u32, y_type:u16 }
create_impl! { x_type:u32, y_type:u8 }

create_impl! { x_type:u16, y_type:u64 }
create_impl! { x_type:u16, y_type:u32 }
create_impl! { x_type:u16, y_type:u16 }
create_impl! { x_type:u16, y_type:u8 }

create_impl! { x_type:u8, y_type:u64 }
create_impl! { x_type:u8, y_type:u32 }
create_impl! { x_type:u8, y_type:u16 }
create_impl! { x_type:u8, y_type:u8 }
