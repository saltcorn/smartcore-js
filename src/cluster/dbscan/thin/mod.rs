mod dense_matrix;
mod distance_type;
mod params;
mod serialize_data;
mod variants;

use std::ops::Deref;

use bincode::{config::standard, decode_from_slice, encode_to_vec, Decode, Encode};
use napi::bindgen_prelude::*;
use napi_derive::napi;

use dense_matrix::{DenseMatrix, DenseMatrixType, DenseMatrixTypeVariantName};
use distance_type::DistanceName;
use params::DBSCANParams;
use serialize_data::DBSCANSerializeData;
use smartcore::{
  cluster::dbscan::{DBSCANParameters, DBSCAN},
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};
use variants::DBSCANVariants;

#[napi(js_name = "DBSCANV2")]
#[derive(Debug)]
pub struct DBSCANWrapper {
  inner: DBSCANVariants,
}

#[napi]
impl DBSCANWrapper {
  #[napi(constructor)]
  pub fn new(params: &DBSCANParams) -> Result<Self> {
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
  pub fn predict(&self, x: &DenseMatrix) -> Result<Int32Array> {
    match &self.inner {
      DBSCANVariants::F32I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::F32I32Mahalanobis(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::F32I32Manhattan(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::F32I32Minkowski(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::F64I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::F64I32Mahalanobis(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::F64I32Manhattan(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::F64I32Minkowski(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::I32I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::I32I32Hamming(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::I32I32Manhattan(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::I32I32Minkowski(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::I64I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::I64I32Manhattan(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::I64I32Minkowski(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U16I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U16I32Hamming(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U32I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U32I32Manhattan(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U64I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U64I32Manhattan(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U8I32Euclidian(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
      DBSCANVariants::U8I32Hamming(dbscan) => {
        let predict_result = dbscan
          .predict(x.try_into()?)
          .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
        Ok(Int32Array::new(predict_result))
      }
    }
  }

  #[napi]
  pub fn serialize(&self) -> Result<Buffer> {
    let serialize_data = DBSCANSerializeData {
      x_type_name: self.inner.x_variant_name(),
      distance_type: self.inner.distance_type(),
      dbscan: self.inner.serialize()?,
    };
    let encoded = encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
    Ok(Buffer::from(encoded))
  }

  #[napi(factory)]
  pub fn deserialize(data: Buffer) -> Result<Self> {
    let serialize_data: DBSCANSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    let variant: DBSCANVariants = serialize_data.try_into()?;
    Ok(Self { inner: variant })
  }
}
