use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::{
  basic::{arrays::Array2, matrix::DenseMatrix as LibDenseMatrix},
  traits::svd::SVD as LibSVD,
};

use crate::linalg::basic::matrix::{DenseMatrixF64, DenseMatrixF64Ref};

macro_rules! js_dense_matrix_struct {
  ( $ty:ty, $ts_name:ty, $p_ref_name:ty ) => {
    paste! {
        #[napi]
        pub struct [<JsDenseMatrix $ty:upper Ref>] {
            inner: SharedReference<$p_ref_name, [<$ts_name Ref>]<'static>>,
        }

        #[napi]
        impl [<JsDenseMatrix $ty:upper Ref>] {
            #[napi]
            pub fn matmul(&self, other: &[<JsDenseMatrix $ty:upper Ref>]) -> $ts_name {
                let inner = self.inner.inner().matmul(other.inner());
                $ts_name::from_inner(inner)
            }

            #[napi]
            pub fn transpose(&self) -> $ts_name {
                let inner = self.inner.inner().transpose();
                $ts_name::from_inner(inner)
            }

            pub fn inner(&self) -> &LibDenseMatrix<$ty> {
                self.inner.inner()
            }
        }
    }
  };
}

js_dense_matrix_struct! { f64, DenseMatrixF64, SVDF64DenseMatrixF64 }

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
            pub fn V(&self, env: Env, reference: Reference<[<SVD $t:upper $ts_name>]>) -> Result<[<Js $ts_name Ref>]> {
                Ok([<JsDenseMatrix $t:upper Ref>] {
                    inner: reference.share_with(env, |svd| {
                        Ok([<DenseMatrix $t:upper Ref>]::from_inner(&svd.inner().V))
                    })?
                })
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

svd_struct! { f64, LibDenseMatrix<f64>, DenseMatrixF64 }
