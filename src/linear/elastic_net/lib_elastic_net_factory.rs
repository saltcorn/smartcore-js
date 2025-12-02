use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::elastic_net::{ElasticNet, ElasticNetParameters as LibElasticNetParameters},
};

use super::factory::ElasticNetParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct ElasticNetParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub elastic_net_parameters: ElasticNetParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibElasticNetFactory {}

macro_rules! create_impl {
    (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibElasticNetFactory {
            pub fn [<$x _ $y>](params: ElasticNetParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibElasticNetParameters::default();
                if let Some(alpha) = params.elastic_net_parameters.alpha {
                    parameters = parameters.with_alpha(alpha);
                }
                if let Some(l1_ratio) = params.elastic_net_parameters.l1_ratio {
                    parameters = parameters.with_l1_ratio(l1_ratio);
                }
                if let Some(normalize) = params.elastic_net_parameters.normalize {
                    parameters = parameters.with_normalize(normalize);
                }
                if let Some(tol) = params.elastic_net_parameters.tol {
                    parameters = parameters.with_tol(tol);
                }
                if let Some(max_iter) = params.elastic_net_parameters.max_iter {
                    parameters = parameters.with_max_iter(max_iter);
                }

                let elastic_net_instance = ElasticNet::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(elastic_net_instance))
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
