use napi::{Error, Status};

use super::{
  predict_output_type::RandomForestClassifierPredictOutputType,
  serialize_data::RandomForestClassifierSerializeData, variants::*, RandomForestClassifier,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<RandomForestClassifierSerializeData> for RandomForestClassifier {
  type Error = Error;

  fn try_from(
    value: RandomForestClassifierSerializeData,
  ) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, RandomForestClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<RandomForestClassifierF64I64>(&value.random_forest_classifier)?,
        ),
        (DenseMatrixType::F32, RandomForestClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<RandomForestClassifierF32I64>(&value.random_forest_classifier)?,
        ),
        (DenseMatrixType::F64, RandomForestClassifierPredictOutputType::U64) => Box::new(
          deserialize_variant::<RandomForestClassifierF64U64>(&value.random_forest_classifier)?,
        ),
        (DenseMatrixType::F32, RandomForestClassifierPredictOutputType::U64) => Box::new(
          deserialize_variant::<RandomForestClassifierF32U64>(&value.random_forest_classifier)?,
        ),
        (DenseMatrixType::F64, RandomForestClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<RandomForestClassifierF64I32>(&value.random_forest_classifier)?,
        ),
        (DenseMatrixType::F32, RandomForestClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<RandomForestClassifierF32I32>(&value.random_forest_classifier)?,
        ),
        (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "RandomForestClassifier supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(RandomForestClassifier {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
