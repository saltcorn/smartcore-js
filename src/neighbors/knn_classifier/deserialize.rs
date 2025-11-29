use super::{serialize_data::KNNClassifierSerializeData, variants::*, KNNClassifier};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  distance_type::DistanceVariantType, traits::PredictorEstimator,
};

impl TryFrom<KNNClassifierSerializeData> for KNNClassifier {
  type Error = napi::Error;

  fn try_from(value: KNNClassifierSerializeData) -> Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> = match value.fit_data_x_type {
      DenseMatrixType::F64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierF64Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Mahalanobis => {
          Box::new(deserialize_variant::<KNNClassifierF64Mahalanobis>(&value.knn_classifier)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNClassifierF64Manhattan>(&value.knn_classifier)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNClassifierF64Minkowski>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier F64 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
          ))
        }
      },
      DenseMatrixType::F32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierF32Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Mahalanobis => {
          Box::new(deserialize_variant::<KNNClassifierF32Mahalanobis>(&value.knn_classifier)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNClassifierF32Manhattan>(&value.knn_classifier)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNClassifierF32Minkowski>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier F32 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierU64Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNClassifierU64Manhattan>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier U64 supports Euclidian/Manhattan distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierU32Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNClassifierU32Manhattan>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier U32 supports Euclidian/Manhattan distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U16 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierU16Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<KNNClassifierU16Hamming>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier U16 supports Euclidian/Hamming distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U8 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierU8Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<KNNClassifierU8Hamming>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier U8 supports Euclidian/Hamming distance metrics only.",
          ))
        }
      },
      DenseMatrixType::I64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierI64Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNClassifierI64Manhattan>(&value.knn_classifier)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNClassifierI64Minkowski>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier I64 supports Euclidian/Manhattan/Minkoswki distance metrics only.",
          ))
        }
      },
      DenseMatrixType::I32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNClassifierI32Euclidian>(&value.knn_classifier)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<KNNClassifierI32Hamming>(&value.knn_classifier)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNClassifierI32Manhattan>(&value.knn_classifier)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNClassifierI32Minkowski>(&value.knn_classifier)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNClassifier I32 supports Euclidian/Hamming/Manhattan/Minkowski distance metrics only.",
          ))
        }
      },
    };

    Ok(KNNClassifier {
      inner: predictor_estimator,
      fit_data_x_type: value.fit_data_x_type,
      fit_data_y_type: value.fit_data_y_type,
      distance_type: value.distance_type,
    })
  }
}
