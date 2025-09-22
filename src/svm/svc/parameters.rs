use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{linalg::basic::matrix::DenseMatrix, svm::svc::SVCParameters as LibSVCParameters};

macro_rules! svc_parameters_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<SVCParameters $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<SVCParameters $x:upper $y:upper>] {
            inner: Option<LibSVCParameters<$x, $y, DenseMatrix<$x>, Vec<$y>>>,
        }

        impl Default for [<SVCParameters $x:upper $y:upper>] {
            fn default() -> Self {
                Self {
                    inner: Some(LibSVCParameters::<$x, $y, DenseMatrix<$x>, Vec<$y>>::default()),
                }
            }
        }

        #[napi]
        impl [<SVCParameters $x:upper $y:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            #[napi]
            pub fn with_epoch(&mut self, epoch: u32) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_epoch(epoch as usize))
                }
            }

            #[napi]
            pub fn with_c(&mut self, c: f64) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_c(c as $x))
                }
            }

            #[napi]
            pub fn with_tol(&mut self, tol: f64) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_tol(tol as $x))
                }
            }

            #[napi]
            pub fn with_seed(&mut self, seed: Option<BigInt>) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_seed(seed.map(|s| s.get_u64().1)))
                }
            }

            pub fn inner(&self) -> &LibSVCParameters<$x, $y, DenseMatrix<$x>, Vec<$y>> {
                self.inner.as_ref().unwrap()
            }
        }
    }
  };
}

svc_parameters_struct! {f32, u32, DenseMatrixF32, Uint32Array}
svc_parameters_struct! {f64, u64, DenseMatrixF64, BigUint64Array}
