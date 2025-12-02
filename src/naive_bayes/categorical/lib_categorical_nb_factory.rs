use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::categorical::{
    CategoricalNB, CategoricalNBParameters as LibCategoricalNBParameters,
  },
};

use super::factory::CategoricalNBParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct CategoricalNBParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub categorical_nb_parameters: CategoricalNBParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibCategoricalNBFactory {}

macro_rules! create_impl {
  (x_type: $x:ty) => {
    paste! {
        impl LibCategoricalNBFactory {
            pub fn [<$x>](params: CategoricalNBParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$x> = params.fit_data_y.try_into()?;
                let mut parameters = LibCategoricalNBParameters::default();
                if let Some(alpha) = params.categorical_nb_parameters.alpha {
                    parameters = parameters.with_alpha(alpha);
                }
                let categorical_nb_instance = CategoricalNB::<$x, LibDenseMatrix<$x>, Vec<$x>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(categorical_nb_instance))
            }
        }
    }
  };
}

create_impl! { x_type:u64 }
create_impl! { x_type:u32 }
create_impl! { x_type:u16 }
create_impl! { x_type:u8 }
