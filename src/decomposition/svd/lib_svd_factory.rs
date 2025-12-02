use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  decomposition::svd::{SVDParameters as LibSVDParameters, SVD},
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

use super::factory::SVDParameters;
use crate::{dense_matrix::DenseMatrix, traits::TransformerEstimator};

pub(super) struct SVDParametersDto<'a> {
  pub(super) fit_data: &'a DenseMatrix,
  pub(super) svd_parameters: SVDParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibSVDFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty
    ) => {
    paste! {
        impl LibSVDFactory {
            pub fn $x (params: SVDParametersDto) -> Result<Box<dyn TransformerEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let mut parameters = LibSVDParameters::default();
                if let Some(n_components) = params.svd_parameters.n_components {
                    parameters = parameters.with_n_components(n_components);
                }
                let svd_instance = SVD::<$x, LibDenseMatrix<$x>>::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(svd_instance))
            }
        }
    }
  };
}

create_impl! { x_type: f64 }
create_impl! { x_type: f32 }
