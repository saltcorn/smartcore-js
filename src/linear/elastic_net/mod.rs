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
  api::SupervisedEstimator,
  linalg::basic::matrix::DenseMatrix,
  linear::elastic_net::{
    ElasticNet as LibElasticNet, ElasticNetParameters as LibElasticNetParameters,
  },
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::ElasticNetParameters;

macro_rules! elastic_net_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<ElasticNet $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<ElasticNet $x:upper $y:upper>] {
            inner: LibElasticNet<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        impl Default for [<ElasticNet $x:upper $y:upper>] {
            fn default() -> Self {
                Self {
                    inner: LibElasticNet::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new(),
                }
            }
        }

        #[napi]
        impl [<ElasticNet $x:upper $y:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &ElasticNetParameters) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibElasticNet::fit(
                    x as &DenseMatrix<$x>,
                    &y,
                    (parameters as &LibElasticNetParameters).to_owned(),
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
                let inner = decode_from_slice::<LibElasticNet::<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<ElasticNet $x:upper $y:upper>] {
            type Target = LibElasticNet<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

elastic_net_struct! {f32, f32, DenseMatrixF32, Float32Array}
elastic_net_struct! {f64, f64, DenseMatrixF64, Float64Array}
elastic_net_struct! {f32, u32, DenseMatrixF32, Uint32Array}
