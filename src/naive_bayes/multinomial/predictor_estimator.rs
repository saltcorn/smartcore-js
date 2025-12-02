use bincode::{config::standard, serde::encode_to_vec};
use napi::{Error, Result, Status};
use paste::paste;

use super::variants::*;
use crate::{
  dense_matrix::DenseMatrix,
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};

macro_rules! predictor_estimator_impl {
  ($variant:ty) => {
    paste! {
        impl Predictor for $variant {
            fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
                self
                    .predict(x.try_into()?)
                    .map(|e| e.into())
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl Estimator for $variant {
            fn serialize(&self) -> Result<Vec<u8>> {
                encode_to_vec(&self, standard()).map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl PredictorEstimator for $variant {}
    }
  };
}

predictor_estimator_impl! { MultinomialNBU64U64 }
predictor_estimator_impl! { MultinomialNBU64U32 }
predictor_estimator_impl! { MultinomialNBU64U16 }
predictor_estimator_impl! { MultinomialNBU64U8 }

predictor_estimator_impl! { MultinomialNBU32U64 }
predictor_estimator_impl! { MultinomialNBU32U32 }
predictor_estimator_impl! { MultinomialNBU32U16 }
predictor_estimator_impl! { MultinomialNBU32U8 }

predictor_estimator_impl! { MultinomialNBU16U64 }
predictor_estimator_impl! { MultinomialNBU16U32 }
predictor_estimator_impl! { MultinomialNBU16U16 }
predictor_estimator_impl! { MultinomialNBU16U8 }

predictor_estimator_impl! { MultinomialNBU8U64 }
predictor_estimator_impl! { MultinomialNBU8U32 }
predictor_estimator_impl! { MultinomialNBU8U16 }
predictor_estimator_impl! { MultinomialNBU8U8 }
