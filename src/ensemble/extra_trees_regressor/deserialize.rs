use napi::{Error, Status};

use super::{
  predict_output_type::ExtraTreesRegressorPredictOutputType,
  serialize_data::ExtraTreesRegressorSerializeData, variants::*, ExtraTreesRegressor,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<ExtraTreesRegressorSerializeData> for ExtraTreesRegressor {
  type Error = Error;

  fn try_from(value: ExtraTreesRegressorSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, ExtraTreesRegressorPredictOutputType::F64) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF64F64>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F32, ExtraTreesRegressorPredictOutputType::F64) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF32F64>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F64, ExtraTreesRegressorPredictOutputType::F32) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF64F32>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F32, ExtraTreesRegressorPredictOutputType::F32) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF32F32>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F64, ExtraTreesRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF64I64>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F32, ExtraTreesRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF32I64>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F64, ExtraTreesRegressorPredictOutputType::U64) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF64U64>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F32, ExtraTreesRegressorPredictOutputType::U64) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF32U64>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F64, ExtraTreesRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF64I32>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::F32, ExtraTreesRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<ExtraTreesRegressorF32I32>(&value.extra_trees_regressor)?,
        ),
        (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "ExtraTreesRegressor supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(ExtraTreesRegressor {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
