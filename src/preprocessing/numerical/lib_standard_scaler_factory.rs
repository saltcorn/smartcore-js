use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  api::UnsupervisedEstimator,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  preprocessing::numerical::{
    StandardScaler, StandardScalerParameters as LibStandardScalerParameters,
  },
};

use crate::{dense_matrix::DenseMatrix, traits::TransformerEstimator};

pub(super) struct StandardScalerParametersDto<'a> {
  pub(super) fit_data: &'a DenseMatrix,
}

#[derive(Debug, Clone, Default)]
pub struct LibStandardScalerFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty
    ) => {
    paste! {
        impl LibStandardScalerFactory {
            pub fn $x (params: StandardScalerParametersDto) -> Result<Box<dyn TransformerEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let standard_scaler_instance = StandardScaler::<$x>::fit(x, LibStandardScalerParameters::default())
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(standard_scaler_instance))
            }
        }
    }
  };
}

create_impl! { x_type: f64 }
create_impl! { x_type: f32 }
