use bincode::{config::standard, serde::decode_from_slice, Decode, Encode};

use super::{dense_matrix::DenseMatrixTypeVariantName, distance_type::DistanceName};
use crate::cluster::dbscan::thin::variants::DBSCANVariants;

#[derive(Encode, Decode)]
pub struct DBSCANSerializeData {
  pub x_type_name: DenseMatrixTypeVariantName,
  pub distance_type: DistanceName,
  pub dbscan: Vec<u8>,
}

fn deserialize_variant<T>(data: &[u8]) -> Result<T, napi::Error>
where
  T: serde::de::DeserializeOwned,
{
  decode_from_slice(data, standard())
    .map_err(|e| napi::Error::new(napi::Status::GenericFailure, e.to_string()))
    .map(|(v, _)| v)
}

impl TryFrom<DBSCANSerializeData> for DBSCANVariants {
  type Error = napi::Error;

  fn try_from(value: DBSCANSerializeData) -> Result<Self, Self::Error> {
    match value.x_type_name {
      DenseMatrixTypeVariantName::F64 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::F64I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Mahalanobis => Ok(DBSCANVariants::F64I32Mahalanobis(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Manhattan => Ok(DBSCANVariants::F64I32Manhattan(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Minkowski => Ok(DBSCANVariants::F64I32Minkowski(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN F64 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::F32 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::F32I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Mahalanobis => Ok(DBSCANVariants::F32I32Mahalanobis(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Manhattan => Ok(DBSCANVariants::F32I32Manhattan(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Minkowski => Ok(DBSCANVariants::F32I32Minkowski(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN F32 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U64 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::U64I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Manhattan => Ok(DBSCANVariants::U64I32Manhattan(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U64 supports Euclidian/Manhattan distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U32 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::U32I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Manhattan => Ok(DBSCANVariants::U32I32Manhattan(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U32 supports Euclidian/Manhattan distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U16 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::U16I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Hamming => Ok(DBSCANVariants::U16I32Hamming(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U16 supports Euclidian/Hamming distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U8 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::U8I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Hamming => Ok(DBSCANVariants::U8I32Hamming(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U8 supports Euclidian/Hamming distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::I64 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::I64I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Manhattan => Ok(DBSCANVariants::I64I32Manhattan(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Minkowski => Ok(DBSCANVariants::I64I32Minkowski(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN I64 supports Euclidian/Manhattan/Minkoswki distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::I32 => match value.distance_type {
        DistanceName::Euclidian => Ok(DBSCANVariants::I32I32Euclidian(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Hamming => Ok(DBSCANVariants::I32I32Hamming(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Manhattan => Ok(DBSCANVariants::I32I32Manhattan(deserialize_variant(
          &value.dbscan,
        )?)),
        DistanceName::Minkowski => Ok(DBSCANVariants::I32I32Minkowski(deserialize_variant(
          &value.dbscan,
        )?)),
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN I32 supports Euclidian/Hamming/Manhattan/Minkowski distance metrics only.",
        )),
      },
    }
  }
}
