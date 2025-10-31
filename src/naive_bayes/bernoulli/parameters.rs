use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::naive_bayes::bernoulli::BernoulliNBParameters as LibBernoulliNBParameters;

macro_rules! bernoulli_parameters_struct {
  ( $y:ty, $y_to:ty ) => {
    paste! {
        #[napi(js_name=""[<BernoulliNB $y_to:upper Parameters>]"")]
        #[derive(Debug, Default)]
        pub struct [<BernoulliNB $y_to:upper Parameters>] {
            inner: Option<LibBernoulliNBParameters<$y_to>>,
        }

        #[napi]
        impl [<BernoulliNB $y_to:upper Parameters>] {
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

            pub fn owned_inner(&self) -> LibBernoulliNBParameters<$y_to> {
                self.inner.as_ref().unwrap().to_owned()
            }
        }
    }
  };
}

bernoulli_parameters_struct! {f64, f64}
bernoulli_parameters_struct! {f64, f32}
bernoulli_parameters_struct! {i64, i64}
bernoulli_parameters_struct! {u16, u16}
bernoulli_parameters_struct! {u8, u8}
bernoulli_parameters_struct! {i32, i32}
bernoulli_parameters_struct! {u32, u32}
bernoulli_parameters_struct! {u64, u64}

macro_rules! with_binarize_impl {
  ( $y:ty, $y_to:ty ) => {
    paste! {
        #[napi]
        impl [<BernoulliNB $y_to:upper Parameters>] {
            #[napi]
            pub fn with_binarize(&mut self, binarize: $y) {
                if let Some(inner) = self.inner.take() {
                    self.inner = Some(inner.with_binarize(binarize as $y_to));
                }
            }
        }
    }
  };
}

with_binarize_impl! {f64, f64}
with_binarize_impl! {f64, f32}
with_binarize_impl! {u16, u16}
with_binarize_impl! {u8, u8}
with_binarize_impl! {i32, i32}
with_binarize_impl! {u32, u32}

#[napi]
impl BernoulliNBI64Parameters {
  #[napi]
  pub fn with_binarize(&mut self, binarize: BigInt) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_binarize(binarize.get_i64().0));
    }
  }
}

#[napi]
impl BernoulliNBU64Parameters {
  #[napi]
  pub fn with_binarize(&mut self, binarize: BigInt) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_binarize(binarize.get_u64().1));
    }
  }
}
