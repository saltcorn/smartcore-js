use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{auc::AUC as LibAUC, Metrics};

macro_rules! auc_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<AUC $x:upper>]"")]
        pub struct [<AUC $x>] {
            inner: LibAUC<$x>,
        }

        impl Default for [<AUC $x>] {
            fn default() -> Self {
                Self {
                    inner: LibAUC::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<AUC $x>] {
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

auc_struct! {f64, Float64Array}
