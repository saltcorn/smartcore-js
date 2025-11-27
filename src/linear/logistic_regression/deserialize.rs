use napi::{Error, Status};

use super::{
  predict_output_type::LogisticRegressionPredictOutputType,
  serialize_data::LogisticRegressionSerializeData, variants::*, LogisticRegression,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<LogisticRegressionSerializeData> for LogisticRegression {
  type Error = Error;

  fn try_from(value: LogisticRegressionSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, LogisticRegressionPredictOutputType::I64) => Box::new(
          deserialize_variant::<LogisticRegressionF64I64>(&value.logistic_regression)?,
        ),
        (DenseMatrixType::F32, LogisticRegressionPredictOutputType::I64) => Box::new(
          deserialize_variant::<LogisticRegressionF32I64>(&value.logistic_regression)?,
        ),
        (DenseMatrixType::F64, LogisticRegressionPredictOutputType::U64) => Box::new(
          deserialize_variant::<LogisticRegressionF64U64>(&value.logistic_regression)?,
        ),
        (DenseMatrixType::F32, LogisticRegressionPredictOutputType::U64) => Box::new(
          deserialize_variant::<LogisticRegressionF32U64>(&value.logistic_regression)?,
        ),
        (DenseMatrixType::F64, LogisticRegressionPredictOutputType::I32) => Box::new(
          deserialize_variant::<LogisticRegressionF64I32>(&value.logistic_regression)?,
        ),
        (DenseMatrixType::F32, LogisticRegressionPredictOutputType::I32) => Box::new(
          deserialize_variant::<LogisticRegressionF32I32>(&value.logistic_regression)?,
        ),
        (DenseMatrixType::F32, _)
        | (DenseMatrixType::F64, _)
        | (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => return Err(Error::new(Status::GenericFailure, "TODO")),
      };
    Ok(LogisticRegression {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
