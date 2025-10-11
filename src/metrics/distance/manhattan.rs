use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{manhattan::Manhattan as LibManhattan, Distance};

macro_rules! manhattan_struct {
  (
    feature_type: $feat:ty,
    array_type: $array_napi:ty
  ) => {
    paste! {
        #[napi(js_name=""[<Manhattan $feat:upper>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<Manhattan $feat:upper>] {
            inner: LibManhattan<$feat>,
        }

        #[napi]
        impl [<Manhattan $feat:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibManhattan::<$feat>::new()
                }
            }

            pub fn owned_inner(&self) -> LibManhattan<$feat> {
                self.inner.to_owned()
            }

            #[napi]
            pub fn distance(&self, x: $array_napi, y: $array_napi) -> f64 {
                let x = x.to_vec();
                let y = y.to_vec();
                self.inner.distance(&x, &y)
            }
        }
    }
  };
}

// Works with both floating point types and integers
// f64 - high precision requirements
// f32 - speed, smaller memory footprint
// i32 - data containing only signed integers
// u32 - data containing only unsigned integers
// i64 - data containing only signed integers (accounts for large numbers)
// u64 - data containing only unsigned integers (accounts for large numbers)
manhattan_struct! { feature_type: f32, array_type: Float32Array}
manhattan_struct! { feature_type: f64, array_type: Float64Array}
manhattan_struct! { feature_type: i32, array_type: Int32Array}
manhattan_struct! { feature_type: u32, array_type: Uint32Array}
manhattan_struct! { feature_type: i64, array_type: BigInt64Array}
manhattan_struct! { feature_type: u64, array_type: BigUint64Array}
