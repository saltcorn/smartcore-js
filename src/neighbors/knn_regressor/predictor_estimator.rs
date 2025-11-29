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

predictor_estimator_impl! { KNNRegressorF32Euclidian }
predictor_estimator_impl! { KNNRegressorF32Mahalanobis }
predictor_estimator_impl! { KNNRegressorF32Manhattan }
predictor_estimator_impl! { KNNRegressorF32Minkowski }

predictor_estimator_impl! { KNNRegressorF64Euclidian }
predictor_estimator_impl! { KNNRegressorF64Mahalanobis }
predictor_estimator_impl! { KNNRegressorF64Manhattan }
predictor_estimator_impl! { KNNRegressorF64Minkowski }

predictor_estimator_impl! { KNNRegressorI32Euclidian }
predictor_estimator_impl! { KNNRegressorI32Hamming }
predictor_estimator_impl! { KNNRegressorI32Manhattan }
predictor_estimator_impl! { KNNRegressorI32Minkowski }

predictor_estimator_impl! { KNNRegressorI64Euclidian }
predictor_estimator_impl! { KNNRegressorI64Manhattan }
predictor_estimator_impl! { KNNRegressorI64Minkowski }

predictor_estimator_impl! { KNNRegressorU16Euclidian }
predictor_estimator_impl! { KNNRegressorU16Hamming }

predictor_estimator_impl! { KNNRegressorU32Euclidian }
predictor_estimator_impl! { KNNRegressorU32Manhattan }

predictor_estimator_impl! { KNNRegressorU64Euclidian }
predictor_estimator_impl! { KNNRegressorU64Manhattan }

predictor_estimator_impl! { KNNRegressorU8Euclidian }
predictor_estimator_impl! { KNNRegressorU8Hamming }
