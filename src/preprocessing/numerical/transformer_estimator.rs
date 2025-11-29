use bincode::{config::standard, serde::encode_to_vec};
use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  api::Transformer as LibTransformer, linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  preprocessing::numerical::StandardScaler as LibStandardScaler,
};

use crate::{
  dense_matrix::DenseMatrix,
  traits::{Estimator, Transformer, TransformerEstimator},
};

macro_rules! transformer_estimator_impl {
  (x_type: $x:ty) => {
    paste! {
        pub type [<StandardScaler $x:upper>] = LibStandardScaler<$x>;

        impl Transformer for [<StandardScaler $x:upper>] {
            fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix> {
                LibTransformer::<LibDenseMatrix<$x>>::transform(self, x.try_into()?)
                    .map(|r| r.into())
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl Estimator for [<StandardScaler $x:upper>] {
            fn serialize(&self) -> napi::Result<Vec<u8>> {
                encode_to_vec(self, standard()).map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl TransformerEstimator for [<StandardScaler $x:upper>] {}
    }
  };
}

transformer_estimator_impl! { x_type: f32 }
transformer_estimator_impl! { x_type: f64 }

#[cfg(test)]
mod tests {
  use smartcore::{
    api::{Transformer, UnsupervisedEstimator},
    dataset::iris::load_dataset,
    linalg::basic::matrix::DenseMatrix,
    preprocessing::numerical::{StandardScaler, StandardScalerParameters},
  };

  #[test]
  fn transform() {
    let dataset = load_dataset();
    let x = DenseMatrix::new(
      dataset.num_features,
      dataset.num_samples,
      dataset.data,
      true,
    )
    .unwrap();
    let standard_scaler_instance =
      StandardScaler::fit(&x, StandardScalerParameters::default()).unwrap();
    let _ = standard_scaler_instance.transform(&x).unwrap();
  }
}
