use napi::{Error, Status};

use super::{serialize_data::GaussianNBSerializeData, variants::*, GaussianNB};
use crate::{deserialize_variant::deserialize_variant, traits::PredictorEstimator};

impl TryFrom<GaussianNBSerializeData> for GaussianNB {
  type Error = Error;

  fn try_from(value: GaussianNBSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::GaussianNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<GaussianNBF64U64>(&value.gaussian_nb)?),
        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::GaussianNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<GaussianNBF32U64>(&value.gaussian_nb)?),

        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::GaussianNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<GaussianNBF64U32>(&value.gaussian_nb)?),
        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::GaussianNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<GaussianNBF32U32>(&value.gaussian_nb)?),

        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::GaussianNBPredictOutputType::U16,
        ) => Box::new(deserialize_variant::<GaussianNBF64U16>(&value.gaussian_nb)?),
        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::GaussianNBPredictOutputType::U16,
        ) => Box::new(deserialize_variant::<GaussianNBF32U16>(&value.gaussian_nb)?),

        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::GaussianNBPredictOutputType::U8,
        ) => Box::new(deserialize_variant::<GaussianNBF64U8>(&value.gaussian_nb)?),
        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::GaussianNBPredictOutputType::U8,
        ) => Box::new(deserialize_variant::<GaussianNBF32U8>(&value.gaussian_nb)?),

        (crate::dense_matrix::DenseMatrixType::I64, _)
        | (crate::dense_matrix::DenseMatrixType::U64, _)
        | (crate::dense_matrix::DenseMatrixType::I32, _)
        | (crate::dense_matrix::DenseMatrixType::U32, _)
        | (crate::dense_matrix::DenseMatrixType::U16, _)
        | (crate::dense_matrix::DenseMatrixType::U8, _) => {
          return Err(Error::new(Status::GenericFailure, "TODO"))
        }
      };
    Ok(GaussianNB {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
