use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  preprocessing::categorical::{
    OneHotEncoder as LibOneHotEncoder, OneHotEncoderParams as LibOneHotEncoderParameters,
  },
};

use crate::linalg::basic::matrix::DenseMatrixF64;

#[derive(Debug, Clone)]
#[napi]
pub struct OneHotEncoderParameters {
  inner: LibOneHotEncoderParameters,
}

#[napi]
impl OneHotEncoderParameters {
  #[napi(constructor)]
  pub fn from_cat_idx(categorical_params: BigUint64Array) -> Self {
    let categorical_params = categorical_params
      .as_ref()
      .iter()
      .map(|p| *p as usize)
      .collect::<Vec<_>>();
    Self {
      inner: LibOneHotEncoderParameters::from_cat_idx(&categorical_params),
    }
  }
}

impl AsRef<LibOneHotEncoderParameters> for OneHotEncoderParameters {
  fn as_ref(&self) -> &LibOneHotEncoderParameters {
    &self.inner
  }
}

macro_rules! one_hot_encoder_struct {
  ($ty:ty) => {
    paste! {
        #[napi(js_name=""[<OneHotEncoder $ty:upper>]"")]
        #[derive(Debug)]
        pub struct [<OneHotEncoder $ty:upper>] {
            inner: LibOneHotEncoder,
        }

        #[napi]
        impl [<OneHotEncoder $ty:upper>] {
            #[napi(constructor)]
            pub fn fit(data: &[<DenseMatrix $ty:upper>], parameters: &OneHotEncoderParameters) -> Result<Self> {
                let pca = LibOneHotEncoder::fit(
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
        }
    }
  };
}

one_hot_encoder_struct! {f64}
