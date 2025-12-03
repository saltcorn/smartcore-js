use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::{accuracy::Accuracy as LibAccuracy, Metrics};

use crate::{
  match_array_types::{match_array_type, MatchedArrays},
  typed_array::TypedArrayWrapper,
};

macro_rules! accuracy_struct {
  ( $ty:ty, $xs:ty ) => {
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
            pub fn get_score(&self, y_true: $xs, y_pred: $xs) -> f64 {
                let y_true = y_true.to_vec();
                let y_pred = y_pred.to_vec();
                self.inner.get_score(&y_true, &y_pred)
            }
        }
    }
  };
}

#[napi]
pub fn accuracy_score(
  y_true: TypedArrayWrapper,
  y_pred: TypedArrayWrapper,
  losslessly: Option<bool>,
) -> Result<f64> {
  match match_array_type(y_true, y_pred, losslessly)? {
    MatchedArrays::F64(y_true, y_pred) => Ok(LibAccuracy::<f64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::F32(y_true, y_pred) => Ok(LibAccuracy::<f32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I64(y_true, y_pred) => Ok(LibAccuracy::<i64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U64(y_true, y_pred) => Ok(LibAccuracy::<u64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I32(y_true, y_pred) => Ok(LibAccuracy::<i32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U32(y_true, y_pred) => Ok(LibAccuracy::<u32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U16(y_true, y_pred) => Ok(LibAccuracy::<u16>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U8(y_true, y_pred) => Ok(LibAccuracy::<u8>::new().get_score(&y_true, &y_pred)),
  }
}

accuracy_struct! {f64, Float64Array}
accuracy_struct! {i64, BigInt64Array}
accuracy_struct! {u64, BigUint64Array}
accuracy_struct! {i32, Int32Array}
