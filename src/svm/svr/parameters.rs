use napi_derive::napi;
use paste::paste;
use smartcore::svm::svr::SVRParameters as LibSVRParameters;

use crate::svm::Kernels;

macro_rules! svr_parameters_struct {
  ( $y:ty, $y_to:ty ) => {
    paste! {
        #[napi(js_name=""[<SVRParameters $y_to:upper>]"")]
        #[derive(Debug)]
        pub struct [<SVRParameters $y_to:upper>] {
            inner: Option<LibSVRParameters<$y_to>>,
        }

        impl Default for [<SVRParameters $y_to:upper>] {
            fn default() -> Self {
                Self {
                    inner: Some(LibSVRParameters::<$y_to>::default()),
                }
            }
        }

        #[napi]
        impl [<SVRParameters $y_to:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            #[napi]
            pub fn with_eps(&mut self, eps: $y) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_eps(eps as $y_to));
                }
            }

            #[napi]
            pub fn with_c(&mut self, c: $y) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_c(c as $y_to));
                }
            }

            #[napi]
            pub fn with_tol(&mut self, tol: $y) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_tol(tol as $y_to));
                }
            }

            #[napi]
            pub fn with_kernel(&mut self, kernel: &Kernels) {
                if let Some(inner) = self.inner.take() {
                    let kernel = kernel.owned_inner();
                    self.inner = Some(inner.with_kernel(kernel));
                }
            }

            pub fn inner(&self) -> &LibSVRParameters<$y_to> {
                self.inner.as_ref().unwrap()
            }
        }
    }
  };
}

svr_parameters_struct! {f64, f32}
svr_parameters_struct! {f64, f64}
