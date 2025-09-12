mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  decomposition::pca::{PCAParameters as LibPCAParameters, PCA as LibPCA},
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::PCAParameters;

macro_rules! pca_struct {
  ($ty:ty) => {
    paste! {
        #[napi(js_name=""[<PCA $ty:upper>]"")]
        #[derive(Debug)]
        pub struct [<PCA $ty:upper>] {
            inner: LibPCA<$ty, DenseMatrix<$ty>>,
        }

        #[napi]
        impl [<PCA $ty:upper>] {
            #[napi(constructor)]
            pub fn fit(data: &[<DenseMatrix $ty:upper>], parameters: &PCAParameters) -> Result<Self> {
                let pca = LibPCA::fit(
                    data as &DenseMatrix<$ty>,
                    (parameters as &LibPCAParameters).to_owned(),
                )
                .unwrap();
                Ok(Self { inner: pca })
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

            #[napi(constructor)]
            pub fn deserialize(&self, data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibPCA<$ty, DenseMatrix<$ty>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}

pca_struct! {f32}
pca_struct! {f64}
