use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{mean_squared_error::MeanSquareError as LibMeanSquareError, Metrics};

macro_rules! mean_squared_error_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<MeanSquareError $x:upper>]"")]
        pub struct [<MeanSquareError $x>] {
            inner: LibMeanSquareError<$x>,
        }

        impl Default for [<MeanSquareError $x>] {
            fn default() -> Self {
                Self {
                    inner: LibMeanSquareError::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<MeanSquareError $x>] {
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

mean_squared_error_struct! {f64, Float64Array}
