use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{cluster_hcv::HCVScore as LibHCVScore, Metrics};

macro_rules! cluster_hcv_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<HCVScore $x:upper>]"")]
        pub struct [<HCVScore $x>] {
            inner: LibHCVScore<$x>,
        }

        impl Default for [<HCVScore $x>] {
            fn default() -> Self {
                Self {
                    inner: LibHCVScore::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<HCVScore $x>] {
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

cluster_hcv_struct! {u32, Uint32Array}
cluster_hcv_struct! {u64, BigUint64Array}
