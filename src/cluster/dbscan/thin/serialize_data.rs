use crate::cluster::dbscan::thin::variants::DBSCANVariants;

use super::{dense_matrix::DenseMatrixTypeVariantName, distance_type::DistanceName, variants};
use bincode::{config::standard, serde::decode_from_slice, Decode, Encode};

#[derive(Encode, Decode)]
pub struct DBSCANSerializeData {
  pub x_type_name: DenseMatrixTypeVariantName,
  pub distance_type: DistanceName,
  pub dbscan: Vec<u8>,
}

impl TryFrom<DBSCANSerializeData> for DBSCANVariants {
  type Error = napi::Error;

  fn try_from(value: DBSCANSerializeData) -> Result<Self, Self::Error> {
    match value.x_type_name {
      DenseMatrixTypeVariantName::F64 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANF64Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::F64I32Euclidian(dbscan))
        }
        DistanceName::Mahalanobis => {
          let dbscan: variants::DBSCANF64Mahalanobis = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::F64I32Mahalanobis(dbscan))
        }
        DistanceName::Manhattan => {
          let dbscan: variants::DBSCANF64Manhattan = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::F64I32Manhattan(dbscan))
        }
        DistanceName::Minkowski => {
          let dbscan: variants::DBSCANF64Minkowski = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::F64I32Minkowski(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN F64 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::F32 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANF32Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{}", e)))?
            .0;
          Ok(DBSCANVariants::F32I32Euclidian(dbscan))
        }
        DistanceName::Mahalanobis => {
          let dbscan: variants::DBSCANF32Mahalanobis = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::F32I32Mahalanobis(dbscan))
        }
        DistanceName::Manhattan => {
          let dbscan: variants::DBSCANF32Manhattan = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::F32I32Manhattan(dbscan))
        }
        DistanceName::Minkowski => {
          let dbscan: variants::DBSCANF32Minkowski = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::F32I32Minkowski(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN F32 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U64 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANU64Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U64I32Euclidian(dbscan))
        }
        DistanceName::Manhattan => {
          let dbscan: variants::DBSCANU64Manhattan = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U64I32Manhattan(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U64 supports Euclidian/Manhattan distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U32 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANU32Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U32I32Euclidian(dbscan))
        }
        DistanceName::Manhattan => {
          let dbscan: variants::DBSCANU32Manhattan = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U32I32Manhattan(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U32 supports Euclidian/Manhattan distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U16 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANU16Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U16I32Euclidian(dbscan))
        }
        DistanceName::Hamming => {
          let dbscan: variants::DBSCANU16Hamming = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U16I32Hamming(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U16 supports Euclidian/Hamming distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::U8 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANU8Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U8I32Euclidian(dbscan))
        }
        DistanceName::Hamming => {
          let dbscan: variants::DBSCANU8Hamming = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::U8I32Hamming(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN U8 supports Euclidian/Hamming distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::I64 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANI64Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::I64I32Euclidian(dbscan))
        }
        DistanceName::Manhattan => {
          let dbscan: variants::DBSCANI64Manhattan = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::I64I32Manhattan(dbscan))
        }
        DistanceName::Minkowski => {
          let dbscan: variants::DBSCANI64Minkowski = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::I64I32Minkowski(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN I64 supports Euclidian/Manhattan/Minkoswki distance metrics only.",
        )),
      },
      DenseMatrixTypeVariantName::I32 => match value.distance_type {
        DistanceName::Euclidian => {
          let dbscan: variants::DBSCANI32Euclidian = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::I32I32Euclidian(dbscan))
        }
        DistanceName::Hamming => {
          let dbscan: variants::DBSCANI32Hamming = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::I32I32Hamming(dbscan))
        }
        DistanceName::Manhattan => {
          let dbscan: variants::DBSCANI32Manhattan = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::I32I32Manhattan(dbscan))
        }
        DistanceName::Minkowski => {
          let dbscan: variants::DBSCANI32Minkowski = decode_from_slice(&value.dbscan, standard())
            .map_err(|e| napi::Error::new(napi::Status::GenericFailure, format!("{e}")))?
            .0;
          Ok(DBSCANVariants::I32I32Minkowski(dbscan))
        }
        _ => Err(napi::Error::new(
          napi::Status::GenericFailure,
          "DBSCAN I32 supports Euclidian/Hamming/Manhattan/Minkowski distance metrics only.",
        )),
      },
    }
  }
}
