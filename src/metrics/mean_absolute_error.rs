use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{mean_absolute_error::MeanAbsoluteError as LibMeanAbsoluteError, Metrics};

macro_rules! mean_absolute_error_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<MeanAbsoluteError $x:upper>]"")]
        pub struct [<MeanAbsoluteError $x>] {
            inner: LibMeanAbsoluteError<$x>,
        }

        impl Default for [<MeanAbsoluteError $x>] {
            fn default() -> Self {
                Self {
                    inner: LibMeanAbsoluteError::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<MeanAbsoluteError $x>] {
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

mean_absolute_error_struct! {f32, Float32Array}
mean_absolute_error_struct! {f64, Float64Array}
