use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  preprocessing::categorical::{OneHotEncoder, OneHotEncoderParams as LibOneHotEncoderParameters},
};

use crate::{dense_matrix::DenseMatrix, traits::TransformerEstimator};

pub(super) struct OneHotEncoderParametersDto<'a> {
  pub(super) fit_data: &'a DenseMatrix,
  pub(super) cat_idx: &'a Vec<usize>,
}

#[derive(Debug, Clone, Default)]
pub struct LibOneHotEncoderFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty
    ) => {
    paste! {
        impl LibOneHotEncoderFactory {
            pub fn $x (params: OneHotEncoderParametersDto) -> Result<Box<dyn TransformerEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let parameters = LibOneHotEncoderParameters::from_cat_idx(params.cat_idx);
                let one_hot_encoder_instance = OneHotEncoder::fit::<$x, LibDenseMatrix<$x>>(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(one_hot_encoder_instance))
            }
        }
    }
  };
}

create_impl! { x_type: f64 }
create_impl! { x_type: f32 }
