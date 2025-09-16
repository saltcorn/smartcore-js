use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{accuracy::Accuracy as LibAccuracy, Metrics};

use crate::refs::{DatasetF32F32JsVecRef, DatasetF32U32JsVecRef, DatasetF64F64JsVecRef};

macro_rules! accuracy_struct {
  ( $ty:ty, $xs:ty, $xs_js:ty ) => {
    paste! {
        #[napi(js_name=""[<Accuracy $ty:upper>]"")]
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
            pub fn get_score(&self, y_true: &$xs, y_pred: $xs_js) -> f64 {
                let y_pred = y_pred.to_vec();
                self.inner.get_score(y_true.as_ref(), &y_pred)
            }
        }
    }
  };
}

accuracy_struct! {f32, DatasetF32F32JsVecRef, Float32Array}
accuracy_struct! {f64, DatasetF64F64JsVecRef, Float64Array}
accuracy_struct! {u32, DatasetF32U32JsVecRef, Uint32Array}
