use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{r2::R2 as LibR2, Metrics};

macro_rules! r2_struct {
  ( $x:ty, $xs:ty ) => {
    paste! {
        #[napi(js_name=""[<R2 $x:upper>]"")]
        pub struct [<R2 $x>] {
            inner: LibR2<$x>,
        }

        impl Default for [<R2 $x>] {
            fn default() -> Self {
                Self {
                    inner: LibR2::<$x>::new(),
                }
            }
        }

        #[napi]
        impl [<R2 $x>] {
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

r2_struct! {f64, Float64Array}
r2_struct! {i64, BigInt64Array}
r2_struct! {u64, BigUint64Array}
