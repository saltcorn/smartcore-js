use bincode::{config::standard, serde::encode_to_vec};
use napi::{Error, Result, Status};
use paste::paste;

use super::variants::*;
use crate::{
  dense_matrix::DenseMatrix,
  predict_output::PredictOutput,
  traits::{Estimator, Predictor, PredictorEstimator},
};

macro_rules! predictor_estimator_impl {
  ($variant:ty) => {
    paste! {
        impl Predictor for $variant {
            fn predict(&self, x: &DenseMatrix) -> Result<PredictOutput> {
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

predictor_estimator_impl! { KMeansF64I32 }
predictor_estimator_impl! { KMeansF64I64 }
predictor_estimator_impl! { KMeansF32I32 }
predictor_estimator_impl! { KMeansF32I64 }
predictor_estimator_impl! { KMeansI64I32 }
predictor_estimator_impl! { KMeansI64I64 }
predictor_estimator_impl! { KMeansI32I32 }
predictor_estimator_impl! { KMeansI32I64 }
predictor_estimator_impl! { KMeansU64I32 }
predictor_estimator_impl! { KMeansU64I64 }
predictor_estimator_impl! { KMeansU32I32 }
predictor_estimator_impl! { KMeansU32I64 }
