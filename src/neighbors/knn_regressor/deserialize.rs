use super::{serialize_data::KNNRegressorSerializeData, variants::*, KNNRegressor};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  distance_type::DistanceVariantType, traits::PredictorEstimator,
};

impl TryFrom<KNNRegressorSerializeData> for KNNRegressor {
  type Error = napi::Error;

  fn try_from(value: KNNRegressorSerializeData) -> Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> = match value.fit_data_x_type {
      DenseMatrixType::F64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorF64Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Mahalanobis => {
          Box::new(deserialize_variant::<KNNRegressorF64Mahalanobis>(&value.knn_regressor)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNRegressorF64Manhattan>(&value.knn_regressor)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNRegressorF64Minkowski>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor F64 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
          ))
        }
      },
      DenseMatrixType::F32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorF32Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Mahalanobis => {
          Box::new(deserialize_variant::<KNNRegressorF32Mahalanobis>(&value.knn_regressor)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNRegressorF32Manhattan>(&value.knn_regressor)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNRegressorF32Minkowski>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor F32 supports Euclidian/Mahalanobis/Manhattan/Minkoski distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorU64Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNRegressorU64Manhattan>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor U64 supports Euclidian/Manhattan distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorU32Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNRegressorU32Manhattan>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor U32 supports Euclidian/Manhattan distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U16 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorU16Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<KNNRegressorU16Hamming>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor U16 supports Euclidian/Hamming distance metrics only.",
          ))
        }
      },
      DenseMatrixType::U8 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorU8Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<KNNRegressorU8Hamming>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor U8 supports Euclidian/Hamming distance metrics only.",
          ))
        }
      },
      DenseMatrixType::I64 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorI64Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNRegressorI64Manhattan>(&value.knn_regressor)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNRegressorI64Minkowski>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor I64 supports Euclidian/Manhattan/Minkoswki distance metrics only.",
          ))
        }
      },
      DenseMatrixType::I32 => match value.distance_type {
        DistanceVariantType::Euclidian => {
          Box::new(deserialize_variant::<KNNRegressorI32Euclidian>(&value.knn_regressor)?)
        }
        DistanceVariantType::Hamming => {
          Box::new(deserialize_variant::<KNNRegressorI32Hamming>(&value.knn_regressor)?)
        }
        DistanceVariantType::Manhattan => {
          Box::new(deserialize_variant::<KNNRegressorI32Manhattan>(&value.knn_regressor)?)
        }
        DistanceVariantType::Minkowski => {
          Box::new(deserialize_variant::<KNNRegressorI32Minkowski>(&value.knn_regressor)?)
        }
        _ => {
          return Err(napi::Error::new(
            napi::Status::GenericFailure,
            "KNNRegressor I32 supports Euclidian/Hamming/Manhattan/Minkowski distance metrics only.",
          ))
        }
      },
    };

    Ok(KNNRegressor {
      inner: predictor_estimator,
      fit_data_x_type: value.fit_data_x_type,
      fit_data_y_type: value.fit_data_y_type,
      distance_type: value.distance_type,
    })
  }
}
