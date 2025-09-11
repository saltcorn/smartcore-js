use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{f1::F1 as LibF1, Metrics};

macro_rules! f1_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<F1 $x:upper>]"")]
        pub struct [<F1 $x>] {
            inner: LibF1<$x>,
        }

        impl Default for [<F1 $x>] {
            fn default() -> Self {
                Self {
                    inner: LibF1::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<F1 $x>] {
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

f1_struct! {f32, Float32Array}
f1_struct! {f64, Float64Array}
