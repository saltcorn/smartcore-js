use std::cell::Ref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::{basic::matrix::DenseMatrix as LibDenseMatrix, traits::svd::SVD as LibSVD};

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF32Ref, DenseMatrixF64, DenseMatrixF64Ref,
};

#[napi]
pub struct JsDenseMatrixF32Ref {
  inner: SharedReference<SVDF32DenseMatrixF32, DenseMatrixF32Ref<'static>>,
}

#[napi]
pub struct JsDenseMatrixF64Ref {
  inner: SharedReference<SVDF64DenseMatrixF64, DenseMatrixF64Ref<'static>>,
}

macro_rules! svd_struct {
  ( $t:ty, $ts:ty, $ts_name:ty ) => {
    paste! {
        #[napi(js_name=""[<SVD $t:upper $ts_name>]"")]
        pub struct [<SVD $t:upper $ts_name>] {
            inner: LibSVD<$t, $ts>
        }

        #[napi]
        impl [<SVD $t:upper $ts_name>] {
            #[napi(js_name="U")]
            #[allow(non_snake_case)]
            pub fn U(&self, env: Env, reference: Reference<[<SVD $t:upper $ts_name>]>) -> Result<[<Js $ts_name Ref>]> {
                Ok([<JsDenseMatrix $t:upper Ref>] {
                    inner: reference.share_with(env, |svd| {
                        Ok([<DenseMatrix $t:upper Ref>]::from_inner(&svd.inner().U))
                    })?
                })
            }

            #[napi(js_name="V")]
            #[allow(non_snake_case)]
            pub fn V(&self) -> Result<$ts_name> {
                let inner = self.inner.V.to_owned();
                Ok($ts_name::from_inner(inner))
            }

            #[napi(js_name="S")]
            #[allow(non_snake_case)]
            pub fn S(&self) -> Result<$ts_name> {
                let inner = self.inner.S();
                Ok($ts_name::from_inner(inner))
            }

            pub fn from_inner(inner: LibSVD<$t, $ts>) -> Self {
                Self { inner }
            }

            pub fn inner(&self) -> &LibSVD<$t, $ts> {
                &self.inner
            }
        }
    }
  };
}

svd_struct! { f32, LibDenseMatrix<f32>, DenseMatrixF32 }
svd_struct! { f64, LibDenseMatrix<f64>, DenseMatrixF64 }
