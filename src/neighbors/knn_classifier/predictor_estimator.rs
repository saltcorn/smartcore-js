use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
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

predictor_estimator_impl! { KNNClassifierF32Euclidian }
predictor_estimator_impl! { KNNClassifierF32Mahalanobis }
predictor_estimator_impl! { KNNClassifierF32Manhattan }
predictor_estimator_impl! { KNNClassifierF32Minkowski }

predictor_estimator_impl! { KNNClassifierF64Euclidian }
predictor_estimator_impl! { KNNClassifierF64Mahalanobis }
predictor_estimator_impl! { KNNClassifierF64Manhattan }
predictor_estimator_impl! { KNNClassifierF64Minkowski }

predictor_estimator_impl! { KNNClassifierI32Euclidian }
predictor_estimator_impl! { KNNClassifierI32Hamming }
predictor_estimator_impl! { KNNClassifierI32Manhattan }
predictor_estimator_impl! { KNNClassifierI32Minkowski }

predictor_estimator_impl! { KNNClassifierI64Euclidian }
predictor_estimator_impl! { KNNClassifierI64Manhattan }
predictor_estimator_impl! { KNNClassifierI64Minkowski }

predictor_estimator_impl! { KNNClassifierU16Euclidian }
predictor_estimator_impl! { KNNClassifierU16Hamming }

predictor_estimator_impl! { KNNClassifierU32Euclidian }
predictor_estimator_impl! { KNNClassifierU32Manhattan }

predictor_estimator_impl! { KNNClassifierU64Euclidian }
predictor_estimator_impl! { KNNClassifierU64Manhattan }

predictor_estimator_impl! { KNNClassifierU8Euclidian }
predictor_estimator_impl! { KNNClassifierU8Hamming }
