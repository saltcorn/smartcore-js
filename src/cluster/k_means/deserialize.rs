use napi::{Error, Status};

use super::{serialize_data::KMeansSerializeData, variants::*, KMeans};
use crate::{deserialize_variant::deserialize_variant, traits::PredictorEstimator};

impl TryFrom<KMeansSerializeData> for KMeans {
  type Error = Error;

  fn try_from(value: KMeansSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::KMeansPredictOutputType::I32,
        ) => Box::new(deserialize_variant::<KMeansF64I32>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::KMeansPredictOutputType::I64,
        ) => Box::new(deserialize_variant::<KMeansF64I64>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::KMeansPredictOutputType::I32,
        ) => Box::new(deserialize_variant::<KMeansF32I32>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::KMeansPredictOutputType::I64,
        ) => Box::new(deserialize_variant::<KMeansF32I64>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::KMeansPredictOutputType::I32,
        ) => Box::new(deserialize_variant::<KMeansU64I32>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::KMeansPredictOutputType::I64,
        ) => Box::new(deserialize_variant::<KMeansU64I64>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::KMeansPredictOutputType::I32,
        ) => Box::new(deserialize_variant::<KMeansU32I32>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::KMeansPredictOutputType::I64,
        ) => Box::new(deserialize_variant::<KMeansU32I64>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::I64,
          super::predict_output_type::KMeansPredictOutputType::I32,
        ) => Box::new(deserialize_variant::<KMeansI64I32>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::I64,
          super::predict_output_type::KMeansPredictOutputType::I64,
        ) => Box::new(deserialize_variant::<KMeansI64I64>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::I32,
          super::predict_output_type::KMeansPredictOutputType::I32,
        ) => Box::new(deserialize_variant::<KMeansI32I32>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::I32,
          super::predict_output_type::KMeansPredictOutputType::I64,
        ) => Box::new(deserialize_variant::<KMeansI32I64>(&value.kmeans)?),
        (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::KMeansPredictOutputType::I32,
        )
        | (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::KMeansPredictOutputType::I64,
        )
        | (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::KMeansPredictOutputType::I32,
        )
        | (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::KMeansPredictOutputType::I64,
        ) => return Err(Error::new(Status::GenericFailure, "TODO")),
      };
    Ok(KMeans {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
