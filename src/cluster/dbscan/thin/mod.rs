mod dense_matrix;
mod distance_type;
mod factory;
mod params;
mod serialize_data;
mod variants;

use std::ops::Deref;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;

use dense_matrix::{DenseMatrix, DenseMatrixType};

use distance_type::DistanceName;
use factory::DBSCANFactory;
use params::{set_parameters, DBSCANParams};
use serialize_data::DBSCANSerializeData;
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
    let distance_type = params.distance_type.unwrap_or(DistanceName::Euclidian);
    let x_data = params.x_data.deref().inner();
    let dbscan_variant = match (x_data, distance_type) {
      // F32I32Euclidian
      (DenseMatrixType::F32(data), DistanceName::Euclidian) => {
        DBSCANFactory::f32_i32_euclidian(data.inner(), params)?
      }
      // F32I32Mahalanobis
      (DenseMatrixType::F32(data), DistanceName::Mahalanobis) => {
        DBSCANFactory::f32_i32_mahalanobis(data.inner(), params)?
      }
      // F32I32Manhattan
      (DenseMatrixType::F32(data), DistanceName::Manhattan) => {
        DBSCANFactory::f32_i32_manhattan(data.inner(), params)?
      }
      // F32I32Minkowski
      (DenseMatrixType::F32(data), DistanceName::Minkowski) => {
        DBSCANFactory::f32_i32_minkowski(data.inner(), params)?
      }
      // F64I32Euclidian
      (DenseMatrixType::F64(data), DistanceName::Euclidian) => {
        DBSCANFactory::f64_i32_euclidian(data.inner(), params)?
      }
      // F64I32Mahalanobis
      (DenseMatrixType::F64(data), DistanceName::Mahalanobis) => {
        DBSCANFactory::f64_i32_mahalanobis(data.inner(), params)?
      }
      // F64I32Manhattan
      (DenseMatrixType::F64(data), DistanceName::Manhattan) => {
        DBSCANFactory::f64_i32_manhattan(data.inner(), params)?
      }
      // F64I32Minkowski
      (DenseMatrixType::F64(data), DistanceName::Minkowski) => {
        DBSCANFactory::f64_i32_minkowski(data.inner(), params)?
      }
      //   I32I32Euclidian
      (DenseMatrixType::I32(data), DistanceName::Euclidian) => {
        DBSCANFactory::i32_i32_euclidian(data.inner(), params)?
      }
      //   I32I32Hamming
      (DenseMatrixType::I32(data), DistanceName::Hamming) => {
        DBSCANFactory::i32_i32_hamming(data.inner(), params)?
      }
      //   I32I32Manhattan
      (DenseMatrixType::I32(data), DistanceName::Manhattan) => {
        DBSCANFactory::i32_i32_manhattan(data.inner(), params)?
      }
      //   I32I32Minkowski
      (DenseMatrixType::I32(data), DistanceName::Minkowski) => {
        DBSCANFactory::i32_i32_minkowski(data.inner(), params)?
      }
      //   I64I32Euclidian
      (DenseMatrixType::I64(data), DistanceName::Euclidian) => {
        DBSCANFactory::i64_i32_euclidian(data.inner(), params)?
      }
      //   I64I32Manhattan
      (DenseMatrixType::I64(data), DistanceName::Manhattan) => {
        DBSCANFactory::i64_i32_manhattan(data.inner(), params)?
      }
      //   I64I32Minkowski
      (DenseMatrixType::I64(data), DistanceName::Minkowski) => {
        DBSCANFactory::i64_i32_minkowski(data.inner(), params)?
      }
      //   U16I32Euclidian
      (DenseMatrixType::U16(data), DistanceName::Euclidian) => {
        DBSCANFactory::u16_i32_euclidian(data.inner(), params)?
      }
      //   U16I32Hamming
      (DenseMatrixType::U16(data), DistanceName::Hamming) => {
        DBSCANFactory::u16_i32_hamming(data.inner(), params)?
      }
      //   U32I32Euclidian
      (DenseMatrixType::U32(data), DistanceName::Euclidian) => {
        DBSCANFactory::u32_i32_euclidian(data.inner(), params)?
      }
      //   U32I32Manhattan
      (DenseMatrixType::U32(data), DistanceName::Manhattan) => {
        DBSCANFactory::u32_i32_manhattan(data.inner(), params)?
      }
      //   U64I32Euclidian
      (DenseMatrixType::U64(data), DistanceName::Euclidian) => {
        DBSCANFactory::u64_i32_euclidian(data.inner(), params)?
      }
      //   U64I32Manhattan
      (DenseMatrixType::U64(data), DistanceName::Manhattan) => {
        DBSCANFactory::u64_i32_manhattan(data.inner(), params)?
      }
      //   U8I32Euclidian
      (DenseMatrixType::U8(data), DistanceName::Euclidian) => {
        DBSCANFactory::u8_i32_euclidian(data.inner(), params)?
      }
      //   U8I32Hamming
      (DenseMatrixType::U8(data), DistanceName::Hamming) => {
        DBSCANFactory::u8_i32_hamming(data.inner(), params)?
      }
      _ => {
        return Err(Error::new(
          Status::GenericFailure,
          format!(
            "Supported distances for '{}' data are: {}. Supported number types for '{}' are '{}'.",
            x_data.variant_name(),
            DBSCANVariants::supported_distances_for(x_data.variant_name()).join("/"),
            distance_type,
            DBSCANVariants::supported_matrix_data_types_for(distance_type).join("/")
          ),
        ))
      }
    };
    Ok(Self {
      inner: dbscan_variant,
    })
  }

  #[napi]
  pub fn predict(&self, x: &DenseMatrix) -> Result<Int32Array> {
    self.inner.predict(x)
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
