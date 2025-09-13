use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::naive_bayes::bernoulli::BernoulliNBParameters as LibBernoulliNBParameters;

macro_rules! svr_parameters_struct {
  ( $y:ty, $y_to:ty ) => {
    paste! {
        #[napi(js_name=""[<BernoulliNBParameters $y_to:upper>]"")]
        #[derive(Debug, Default)]
        pub struct [<BernoulliNBParameters $y_to:upper>] {
            inner: Option<LibBernoulliNBParameters<$y_to>>,
        }

        #[napi]
        impl [<BernoulliNBParameters $y_to:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: Some(LibBernoulliNBParameters::<$y_to>::default()),
                }
            }

            #[napi]
            pub fn with_priors(&mut self, priors: Float64Array) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_priors(priors.to_vec()))
                }
            }

            #[napi]
            pub fn with_alpha(&mut self, alpha: f64) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_alpha(alpha));
                }
            }

            #[napi]
            pub fn with_binarize(&mut self, binarize: $y) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_binarize(binarize as $y_to));
                }
            }

            pub fn owned_inner(&self) -> LibBernoulliNBParameters<$y_to> {
                self.inner.as_ref().unwrap().to_owned()
            }
        }
    }
  };
}

svr_parameters_struct! {f64, f32}
svr_parameters_struct! {f64, f64}
