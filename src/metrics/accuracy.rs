use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{accuracy::Accuracy as LibAccuracy, Metrics};

macro_rules! accuracy_struct {
  ( $ty:ty, $xs:ty ) => {
    paste! {
        #[napi]
        pub struct [<Accuracy $ty>] {
            inner: LibAccuracy<$ty>,
        }

        impl Default for [<Accuracy $ty>] {
            fn default() -> Self {
                Self {
                    inner: LibAccuracy::<$ty>::new(),
                }
            }
        }

        #[napi]
        impl [<Accuracy $ty>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            #[napi]
            pub fn get_score(&self, y_true: $xs, y_pred: $xs) -> f64 {
                let y_true = y_true.to_vec();
                let y_pred = y_pred.to_vec();
                self.inner.get_score(&y_true, &y_pred)
            }
        }
    }
  };
}

accuracy_struct! {f32, Float32Array}
accuracy_struct! {f64, Float64Array}
accuracy_struct! {u32, Uint32Array}
