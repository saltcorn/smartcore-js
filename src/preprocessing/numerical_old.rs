use std::ops::Deref;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  api::{Transformer, UnsupervisedEstimator},
  linalg::basic::matrix::DenseMatrix,
  preprocessing::numerical::{
    StandardScaler as LibStandardScaler, StandardScalerParameters as LibStandardScalerParameters,
  },
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};

#[derive(Debug, Default, Clone)]
#[napi]
pub struct StandardScalerParameters {
  inner: LibStandardScalerParameters,
}

#[napi]
impl StandardScalerParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }
}

impl AsRef<LibStandardScalerParameters> for StandardScalerParameters {
  fn as_ref(&self) -> &LibStandardScalerParameters {
    &self.inner
  }
}

macro_rules! standard_scaler_struct {
  ($ty:ty) => {
    paste! {
        #[napi(js_name=""[<StandardScaler $ty:upper>]"")]
        #[derive(Debug)]
        pub struct [<StandardScaler $ty:upper>] {
            inner: LibStandardScaler<$ty>,
        }

        #[napi]
        impl [<StandardScaler $ty:upper>] {
            #[napi]
            pub fn fit(data: &[<DenseMatrix $ty:upper>], parameters: &StandardScalerParameters) -> Result<Self> {
                let pca = LibStandardScaler::fit(
                    data as &DenseMatrix<$ty>,
                    parameters.as_ref().to_owned(),
                )
                .unwrap();
                Ok(Self { inner: pca })
            }

            #[napi]
            pub fn transform(&self, x: &[<DenseMatrix $ty:upper>]) -> Result<[<DenseMatrix $ty:upper>]> {
                let matrix = self
                    .inner
                    .transform(x.deref())
                    .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
                Ok([<DenseMatrix $ty:upper>]::from_inner(matrix))
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibStandardScaler<$ty>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}

standard_scaler_struct! {f64}
standard_scaler_struct! {f32}
