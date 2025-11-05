mod dense_matrix;
mod distance_type;
mod params;
mod typed_array;
mod variants;

use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use dense_matrix::{DenseMatrix, DenseMatrixType};
use distance_type::DistanceName;
use params::DBSCANParams;
use smartcore::{
  cluster::dbscan::{DBSCANParameters, DBSCAN},
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};
use variants::DBSCANVariants;

#[napi(js_name = "DBSCAN")]
#[derive(Debug)]
pub struct DBSCANWrapper {
  inner: DBSCANVariants,
}

#[napi]
impl DBSCANWrapper {
  #[napi]
  pub fn create(params: &DBSCANParams) -> Result<Self> {
    let distance_type = params
      .distance_type
      .as_ref()
      .unwrap_or(&DistanceName::Euclidian);
    let x_data = params.x_data.deref().inner();
    let dbscan_variant = match (x_data, distance_type) {
      (DenseMatrixType::F32(data), DistanceName::Euclidian) => {
        let x = data.inner();
        let parameters = DBSCANParameters::default();
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
        DBSCANVariants::F32I32Euclidian(dbscan_instance)
      }

      (DenseMatrixType::F32(data), DistanceName::Mahalanobis) => {
        let x = data.inner();
        let Some(ref p_data) = params.data else {
          return Err(Error::new(
            Status::GenericFailure,
            "'data' must be specified for 'Mahalanobis' distance type",
          ));
        };
        let parameters = match p_data.deref().inner() {
          DenseMatrixType::F32(p_data) => {
            let p_data = p_data.deref().inner();
            DBSCANParameters::default().with_distance(Mahalanobis::new(p_data))
          }
          _ => unimplemented!(),
        };
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
        DBSCANVariants::F32I32Mahalanobis(dbscan_instance)
      }

      (DenseMatrixType::F32(data), DistanceName::Manhattan) => {
        let x = data.inner();
        let parameters = DBSCANParameters::default().with_distance(Manhattan::default());
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        DBSCANVariants::F32I32Manhattan(dbscan_instance)
      }

      (DenseMatrixType::F32(data), DistanceName::Minkowski) => {
        let x = data.inner();
        let Some(p) = params.p else {
          return Err(Error::new(
            Status::GenericFailure,
            "'p' must be specified for 'Minkowski' distance type",
          ));
        };
        let parameters = DBSCANParameters::default().with_distance(Minkowski::new(p));
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        DBSCANVariants::F32I32Minkowski(dbscan_instance)
      }

      (DenseMatrixType::F64(data), DistanceName::Euclidian) => {
        let x = data.inner();
        let parameters = DBSCANParameters::default();
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
        DBSCANVariants::F64I32Euclidian(dbscan_instance)
      }

      (DenseMatrixType::F64(data), DistanceName::Mahalanobis) => {
        let x = data.inner();
        let Some(ref p_data) = params.data else {
          return Err(Error::new(
            Status::GenericFailure,
            "'data' must be specified for 'Mahalanobis' distance type",
          ));
        };
        let parameters = match p_data.deref().inner() {
          DenseMatrixType::F64(p_data) => {
            let p_data = p_data.deref().inner();
            DBSCANParameters::default().with_distance(Mahalanobis::new(p_data))
          }
          _ => unimplemented!(),
        };
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
        DBSCANVariants::F64I32Mahalanobis(dbscan_instance)
      }

      (DenseMatrixType::F64(data), DistanceName::Manhattan) => {
        let x = data.inner();
        let parameters = DBSCANParameters::default().with_distance(Manhattan::default());
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        DBSCANVariants::F64I32Manhattan(dbscan_instance)
      }

      (DenseMatrixType::F64(data), DistanceName::Minkowski) => {
        let x = data.inner();
        let Some(p) = params.p else {
          return Err(Error::new(
            Status::GenericFailure,
            "'p' must be specified for 'Minkowski' distance type",
          ));
        };
        let parameters = DBSCANParameters::default().with_distance(Minkowski::new(p));
        let dbscan_instance = DBSCAN::fit(x, parameters)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        DBSCANVariants::F64I32Minkowski(dbscan_instance)
      }
      _ => unimplemented!(),
    };
    Ok(Self {
      inner: dbscan_variant,
    })
  }

  #[napi]
  pub fn predict(&self, x: &DenseMatrix) -> Result<Float32Array> {
    let x = x.as(self.inner.x_variant_name())
    let predict_result = self
      .inner
      .predict(x)
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
    Ok(Float32Array::new(predict_result))
  }

  #[napi]
  pub fn serialize(&self) -> Result<Buffer> {
    let encoded = encode_to_vec(&self.inner, standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
    Ok(Buffer::from(encoded))
  }

  #[napi(factory)]
  pub fn deserialize(data: Buffer) -> Result<Self> {
    let inner =
      decode_from_slice::<DBSCAN<f32, i32, DenseMatrix<f32>, Vec<i32>, Euclidian<f32>>, _>(
        data.as_ref(),
        standard(),
      )
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    Ok(Self { inner })
  }
}
