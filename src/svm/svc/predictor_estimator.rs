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
        impl<'a> Predictor for $variant<'a> {
            fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
                self
                    .predict(x.try_into()?)
                    .map(|e| e.into())
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl<'a> Estimator for $variant<'a> {
            fn serialize(&self) -> Result<Vec<u8>> {
                encode_to_vec(&self, standard()).map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl<'a> PredictorEstimator for $variant<'a> {}
    }
  };
}

predictor_estimator_impl! { SVCF64I64 }
predictor_estimator_impl! { SVCF32I64 }

predictor_estimator_impl! { SVCF64I32 }
predictor_estimator_impl! { SVCF32I32 }
