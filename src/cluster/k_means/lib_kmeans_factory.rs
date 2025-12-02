use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  cluster::kmeans::{KMeans, KMeansParameters as LibKMeansParameters},
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

use super::factory::KMeansParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator};

pub struct KMeansParametersDto<'a> {
  pub fit_data: &'a DenseMatrix,
  pub kmeans_parameters: KMeansParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibKMeansFactory {}

macro_rules! create_impl {
  (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibKMeansFactory {
            pub fn [<$x _ $y>](params: KMeansParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let mut parameters = LibKMeansParameters::default();
                if let Some(k) = params.kmeans_parameters.k {
                    parameters = parameters.with_k(k);
                }
                if let Some(max_iter) = params.kmeans_parameters.max_iter {
                    parameters = parameters.with_max_iter(max_iter);
                }
                let kmeans_instance = KMeans::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(kmeans_instance))
            }
        }
    }
  };
}

create_impl! { x_type:f32, y_type:i32 }
create_impl! { x_type:f32, y_type:i64 }

create_impl! { x_type:f64, y_type:i32 }
create_impl! { x_type:f64, y_type:i64 }

create_impl! { x_type:i64, y_type:i32 }
create_impl! { x_type:i64, y_type:i64 }

create_impl! { x_type:i32, y_type:i32 }
create_impl! { x_type:i32, y_type:i64 }

create_impl! { x_type:u64, y_type:i32 }
create_impl! { x_type:u64, y_type:i64 }

create_impl! { x_type:u32, y_type:i32 }
create_impl! { x_type:u32, y_type:i64 }
