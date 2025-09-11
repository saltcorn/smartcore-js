use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{recall::Recall as LibRecall, Metrics};

macro_rules! recall_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<Recall $x:upper>]"")]
        pub struct [<Recall $x>] {
            inner: LibRecall<$x>,
        }

        impl Default for [<Recall $x>] {
            fn default() -> Self {
                Self {
                    inner: LibRecall::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<Recall $x>] {
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

recall_struct! {f32, Float32Array}
recall_struct! {f64, Float64Array}
