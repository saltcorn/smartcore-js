use napi::{Error, Status};

use super::{
  predict_output_type::RandomForestRegressorPredictOutputType,
  serialize_data::RandomForestRegressorSerializeData, variants::*, RandomForestRegressor,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<RandomForestRegressorSerializeData> for RandomForestRegressor {
  type Error = Error;

  fn try_from(value: RandomForestRegressorSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::F64) => Box::new(
          deserialize_variant::<RandomForestRegressorF64F64>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::F64) => Box::new(
          deserialize_variant::<RandomForestRegressorF32F64>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::F32) => Box::new(
          deserialize_variant::<RandomForestRegressorF64F32>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::F32) => Box::new(
          deserialize_variant::<RandomForestRegressorF32F32>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<RandomForestRegressorF64I64>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<RandomForestRegressorF32I64>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::U64) => Box::new(
          deserialize_variant::<RandomForestRegressorF64U64>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::U64) => Box::new(
          deserialize_variant::<RandomForestRegressorF32U64>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<RandomForestRegressorF64I32>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<RandomForestRegressorF32I32>(&value.random_forest_regressor)?,
        ),
        (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "RandomForestRegressor supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(RandomForestRegressor {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
