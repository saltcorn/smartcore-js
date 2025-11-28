use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::bernoulli::{BernoulliNB, BernoulliNBParameters as LibBernoulliNBParameters},
};

use super::factory::BernoulliNBParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct BernoulliNBParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub bernoulli_nb_parameters: BernoulliNBParameters<'a>,
}

#[derive(Debug, Clone, Default)]
pub struct LibBernoulliNBFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibBernoulliNBFactory {
            pub fn [<$x _ $y>](params: BernoulliNBParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibBernoulliNBParameters::default();
                if let Some(alpha) = params.bernoulli_nb_parameters.alpha {
                    parameters = parameters.with_alpha(alpha);
                }
                if let Some(priors) = params.bernoulli_nb_parameters.priors {
                    parameters = parameters.with_priors(priors.to_vec());
                }
                if let Some(binarize) = params.bernoulli_nb_parameters.binarize {
                    parameters = parameters.with_binarize(binarize.try_into()?);
                }
                let bernoulli_nb_instance = BernoulliNB::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(bernoulli_nb_instance))
            }
        }
    }
  };
}

create_impl! { x_type:f64, y_type:u32 }
create_impl! { x_type:f64, y_type:u64 }

create_impl! { x_type:f32, y_type:u32 }
create_impl! { x_type:f32, y_type:u64 }

create_impl! { x_type:i64, y_type:u32 }
create_impl! { x_type:i64, y_type:u64 }

create_impl! { x_type:u64, y_type:u32 }
create_impl! { x_type:u64, y_type:u64 }

create_impl! { x_type:i32, y_type:u32 }
create_impl! { x_type:i32, y_type:u64 }

create_impl! { x_type:u32, y_type:u32 }
create_impl! { x_type:u32, y_type:u64 }

create_impl! { x_type:u16, y_type:u32 }
create_impl! { x_type:u16, y_type:u64 }

create_impl! { x_type:u8, y_type:u32 }
create_impl! { x_type:u8, y_type:u64 }
