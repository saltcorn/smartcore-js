mod parameters;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  decomposition::pca::{PCAParameters as LibPCAParameters, PCA as LibPCA},
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::{DenseMatrixf32, DenseMatrixf64};
use parameters::PCAParameters;

macro_rules! pca_struct {
  ($ty:ty) => {
    paste! {
        #[napi]
        #[derive(Debug)]
        pub struct [<PCA $ty>] {
            inner: LibPCA<$ty, DenseMatrix<$ty>>,
        }

        #[napi]
        impl [<PCA $ty>] {
            #[napi(constructor)]
            pub fn fit(data: &[<DenseMatrix $ty>], parameters: &PCAParameters) -> Result<Self> {
                let pca = LibPCA::fit(
                    data as &DenseMatrix<$ty>,
                    (parameters as &LibPCAParameters).to_owned(),
                )
                .unwrap();
                Ok(Self { inner: pca })
            }

            #[napi]
            pub fn transform(&self, x: &[<DenseMatrix $ty>]) -> Result<[<DenseMatrix $ty>]> {
                let matrix = self
                    .inner
                    .transform(x)
                    .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
                Ok([<DenseMatrix $ty>]::from_inner(matrix))
            }
        }
    }
  };
}

pca_struct! {f32}
pca_struct! {f64}
