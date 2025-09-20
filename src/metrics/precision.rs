use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{precision::Precision as LibPrecision, Metrics};

macro_rules! precision_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<Precision $x:upper>]"")]
        pub struct [<Precision $x>] {
            inner: LibPrecision<$x>,
        }

        impl Default for [<Precision $x>] {
            fn default() -> Self {
                Self {
                    inner: LibPrecision::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<Precision $x>] {
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

precision_struct! {f64, Float64Array}
