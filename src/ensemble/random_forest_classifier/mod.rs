mod parameters;

use std::ops::Deref;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  ensemble::random_forest_classifier::RandomForestClassifier as LibRandomForestClassifier,
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::RandomForestClassifierParameters;

macro_rules! random_forest_classifier_nb_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<RandomForestClassifier $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<RandomForestClassifier $x:upper $y:upper>] {
            inner: LibRandomForestClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<RandomForestClassifier $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &RandomForestClassifierParameters) -> Result<Self> {
                let inner = LibRandomForestClassifier::fit(
                    x as &DenseMatrix<$x>,
                    &y.to_vec(),
                    parameters.owned_inner(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys> {
                let prediction_result = self
                .inner
                .predict(x as &DenseMatrix<$x>)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($ys::new(prediction_result))
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibRandomForestClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<RandomForestClassifier $x:upper $y:upper>] {
            type Target = LibRandomForestClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

random_forest_classifier_nb_struct! {f32, u32, DenseMatrixF32, Uint32Array}
random_forest_classifier_nb_struct! {f64, u64, DenseMatrixF64, BigUint64Array}
