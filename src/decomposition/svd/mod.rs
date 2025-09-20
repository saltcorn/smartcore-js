mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  decomposition::svd::{SVDParameters as LibSVDParameters, SVD as LibSVD},
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::DenseMatrixF64;
use parameters::SVDParameters;

macro_rules! svd_struct {
  ($ty:ty) => {
    paste! {
        #[napi(js_name=""[<SVD $ty:upper>]"")]
        #[derive(Debug)]
        pub struct [<SVD $ty:upper>] {
            inner: LibSVD<$ty, DenseMatrix<$ty>>,
        }

        #[napi]
        impl [<SVD $ty:upper>] {
            #[napi(constructor)]
            pub fn fit(data: &[<DenseMatrix $ty:upper>], parameters: &SVDParameters) -> Result<Self> {
                let svd = LibSVD::fit(
                    data as &DenseMatrix<$ty>,
                    (parameters as &LibSVDParameters).to_owned(),
                )
                .unwrap();
                Ok(Self { inner: svd })
            }

            #[napi]
            pub fn transform(&self, x: &[<DenseMatrix $ty:upper>]) -> Result<[<DenseMatrix $ty:upper>]> {
                let matrix = self
                    .inner
                    .transform(x)
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
                let inner = decode_from_slice::<LibSVD<$ty, DenseMatrix<$ty>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}

svd_struct! {f64}
