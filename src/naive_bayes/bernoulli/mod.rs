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
  linalg::basic::matrix::DenseMatrix, naive_bayes::bernoulli::BernoulliNB as LibGausianNB,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::{BernoulliNBParametersF32, BernoulliNBParametersF64};

macro_rules! bernoulli_nb_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<GausianNB $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<GausianNB $x:upper $y:upper>] {
            inner: LibGausianNB<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<GausianNB $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &[<BernoulliNBParameters $x:upper>]) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibGausianNB::fit(
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
                let inner = decode_from_slice::<LibGausianNB<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<GausianNB $x:upper $y:upper>] {
            type Target = LibGausianNB<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

bernoulli_nb_struct! {f32, u32, DenseMatrixF32, Uint32Array}
bernoulli_nb_struct! {f64, u64, DenseMatrixF64, BigUint64Array}
