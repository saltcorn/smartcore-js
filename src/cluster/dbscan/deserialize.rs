use bincode::{config::standard, serde::decode_from_slice};

use crate::cluster::dbscan::predictor_estimator::PredictorEstimator;

use super::{
  dense_matrix::DenseMatrixTypeVariantName, distance_type::DistanceVariantType,
  serialize_data::DBSCANSerializeData, variants::*, DBSCANV2,
};

fn deserialize_variant<T>(data: &[u8]) -> Result<T, napi::Error>
where
  T: serde::de::DeserializeOwned,
{
  decode_from_slice(data, standard())
    .map_err(|e| napi::Error::new(napi::Status::GenericFailure, e.to_string()))
    .map(|(v, _)| v)
}

impl TryFrom<DBSCANSerializeData> for DBSCANV2 {
  type Error = napi::Error;

  fn try_from(value: DBSCANSerializeData) -> Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> = match value.fit_data_variant_type {
      DenseMatrixTypeVariantName::F64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANF64Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Mahalanobis => {
          Box::new(deserialize_variant::<DBSCANF64Mahalanobis>(&value.dbscan)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<DBSCANF64Manhattan>(&value.dbscan)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<DBSCANF64Minkowski>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN F64 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
          ))
        }
      },
      DenseMatrixTypeVariantName::F32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANF32Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Mahalanobis => {
          Box::new(deserialize_variant::<DBSCANF32Mahalanobis>(&value.dbscan)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<DBSCANF32Manhattan>(&value.dbscan)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<DBSCANF32Minkowski>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN F32 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
          ))
        }
      },
      DenseMatrixTypeVariantName::U64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANU64Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<DBSCANU64Manhattan>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN U64 supports Euclidian/Manhattan distance metrics only.",
          ))
        }
      },
      DenseMatrixTypeVariantName::U32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANU32Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<DBSCANU32Manhattan>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN U32 supports Euclidian/Manhattan distance metrics only.",
          ))
        }
      },
      DenseMatrixTypeVariantName::U16 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANU16Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<DBSCANU16Hamming>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN U16 supports Euclidian/Hamming distance metrics only.",
          ))
        }
      },
      DenseMatrixTypeVariantName::U8 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANU8Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<DBSCANU8Hamming>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN U8 supports Euclidian/Hamming distance metrics only.",
          ))
        }
      },
      DenseMatrixTypeVariantName::I64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANI64Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<DBSCANI64Manhattan>(&value.dbscan)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<DBSCANI64Minkowski>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN I64 supports Euclidian/Manhattan/Minkoswki distance metrics only.",
          ))
        }
      },
      DenseMatrixTypeVariantName::I32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<DBSCANI32Euclidian>(&value.dbscan)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<DBSCANI32Hamming>(&value.dbscan)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<DBSCANI32Manhattan>(&value.dbscan)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<DBSCANI32Minkowski>(&value.dbscan)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "DBSCAN I32 supports Euclidian/Hamming/Manhattan/Minkowski distance metrics only.",
          ))
        }
      },
    };

    Ok(DBSCANV2 {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      distance_type: value.distance_type,
    })
  }
}
