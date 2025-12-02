use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  decomposition::pca::{PCAParameters as LibPCAParameters, PCA},
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

use super::factory::PCAParameters;
use crate::{dense_matrix::DenseMatrix, traits::TransformerEstimator};

pub(super) struct PCAParametersDto<'a> {
  pub(super) fit_data: &'a DenseMatrix,
  pub(super) pca_parameters: PCAParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibPCAFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty
    ) => {
    paste! {
        impl LibPCAFactory {
            pub fn $x (params: PCAParametersDto) -> Result<Box<dyn TransformerEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let mut parameters = LibPCAParameters::default();
                if let Some(n_components) = params.pca_parameters.n_components {
                    parameters = parameters.with_n_components(n_components);
                }
                if let Some(use_correlation_matrix) = params.pca_parameters.use_correlation_matrix {
                    parameters = parameters.with_use_correlation_matrix(use_correlation_matrix);
                }
                let pca_instance = PCA::<$x, LibDenseMatrix<$x>>::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(pca_instance))
            }
        }
    }
  };
}

create_impl! { x_type: f64 }
create_impl! { x_type: f32 }
