use napi::{Error, Status};

use super::{serialize_data::MultinomialNBSerializeData, variants::*, MultinomialNB};
use crate::{deserialize_variant::deserialize_variant, traits::PredictorEstimator};

impl TryFrom<MultinomialNBSerializeData> for MultinomialNB {
  type Error = Error;

  fn try_from(value: MultinomialNBSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::MultinomialNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<MultinomialNBU64U64>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::MultinomialNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<MultinomialNBU64U32>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::MultinomialNBPredictOutputType::U16,
        ) => Box::new(deserialize_variant::<MultinomialNBU64U16>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::MultinomialNBPredictOutputType::U8,
        ) => Box::new(deserialize_variant::<MultinomialNBU64U8>(
          &value.multinomial_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::MultinomialNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<MultinomialNBU32U64>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::MultinomialNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<MultinomialNBU32U32>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::MultinomialNBPredictOutputType::U16,
        ) => Box::new(deserialize_variant::<MultinomialNBU32U16>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::MultinomialNBPredictOutputType::U8,
        ) => Box::new(deserialize_variant::<MultinomialNBU32U8>(
          &value.multinomial_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::MultinomialNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<MultinomialNBU16U64>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::MultinomialNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<MultinomialNBU16U32>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::MultinomialNBPredictOutputType::U16,
        ) => Box::new(deserialize_variant::<MultinomialNBU16U16>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::MultinomialNBPredictOutputType::U8,
        ) => Box::new(deserialize_variant::<MultinomialNBU16U8>(
          &value.multinomial_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::MultinomialNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<MultinomialNBU8U64>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::MultinomialNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<MultinomialNBU8U32>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::MultinomialNBPredictOutputType::U16,
        ) => Box::new(deserialize_variant::<MultinomialNBU8U16>(
          &value.multinomial_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::MultinomialNBPredictOutputType::U8,
        ) => Box::new(deserialize_variant::<MultinomialNBU8U8>(
          &value.multinomial_nb,
        )?),

        (crate::dense_matrix::DenseMatrixType::F64, _)
        | (crate::dense_matrix::DenseMatrixType::F32, _)
        | (crate::dense_matrix::DenseMatrixType::I64, _)
        | (crate::dense_matrix::DenseMatrixType::I32, _) => {
          return Err(Error::new(Status::GenericFailure, "TODO"))
        }
      };
    Ok(MultinomialNB {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
