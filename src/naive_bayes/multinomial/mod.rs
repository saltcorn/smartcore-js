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
  linalg::basic::matrix::DenseMatrix, naive_bayes::multinomial::MultinomialNB as LibMultinomialNB,
};

use crate::linalg::basic::matrix::DenseMatrixU64;
use parameters::MultinomialNBParameters;

macro_rules! multinomial_nb_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<MultinomialNB $x:upper $y_mod $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<MultinomialNB $x:upper $y_mod $y:upper>] {
            inner: LibMultinomialNB<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<MultinomialNB $x:upper $y_mod $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &MultinomialNBParameters) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibMultinomialNB::fit(
                    x as &DenseMatrix<$x>,
                    &y,
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
                let inner = decode_from_slice::<LibMultinomialNB<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<MultinomialNB $x:upper $y_mod $y:upper>] {
            type Target = LibMultinomialNB<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

multinomial_nb_struct! {u64, u64, "Big", DenseMatrixU64, BigUint64Array}
