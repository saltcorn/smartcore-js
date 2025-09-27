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
  linalg::basic::matrix::DenseMatrix, naive_bayes::gaussian::GaussianNB as LibGaussianNB,
};

use crate::linalg::basic::matrix::DenseMatrixF64;
use parameters::GaussianNBParameters;

macro_rules! gaussian_nb_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<GaussianNB $x:upper $y_mod $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<GaussianNB $x:upper $y_mod $y:upper>] {
            inner: LibGaussianNB<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<GaussianNB $x:upper $y_mod $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &GaussianNBParameters) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibGaussianNB::fit(
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
                let inner = decode_from_slice::<LibGaussianNB<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<GaussianNB $x:upper $y_mod $y:upper>] {
            type Target = LibGaussianNB<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

gaussian_nb_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array}
