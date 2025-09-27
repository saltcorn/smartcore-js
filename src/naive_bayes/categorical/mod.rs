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
  linalg::basic::matrix::DenseMatrix, naive_bayes::categorical::CategoricalNB as LibCategoricalNB,
};

use crate::linalg::basic::matrix::DenseMatrixU64;
use parameters::CategoricalNBParameters;

macro_rules! categorical_nb_struct {
  ( $t:ty, $y_mod:literal, $ts1:ty, $ts2:ty ) => {
    paste! {
        #[napi(js_name=""[<CategoricalNB $y_mod $t:upper>]"")]
        #[derive(Debug)]
        pub struct [<CategoricalNB $y_mod $t:upper>] {
            inner: LibCategoricalNB<$t, DenseMatrix<$t>, Vec<$t>>,
        }

        #[napi]
        impl [<CategoricalNB $y_mod $t:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$ts1, y: $ts2, parameters: &CategoricalNBParameters) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibCategoricalNB::fit(
                    x as &DenseMatrix<$t>,
                    &y,
                    parameters.owned_inner(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$ts1) -> Result<$ts2> {
                let prediction_result = self
                .inner
                .predict(x as &DenseMatrix<$t>)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($ts2::new(prediction_result))
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibCategoricalNB<$t, DenseMatrix<$t>, Vec<$t>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<CategoricalNB$y_mod $t:upper>] {
            type Target = LibCategoricalNB<$t, DenseMatrix<$t>, Vec<$t>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

categorical_nb_struct! {u64, "Big", DenseMatrixU64, BigUint64Array}
