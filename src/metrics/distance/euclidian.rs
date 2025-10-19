use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{euclidian::Euclidian as LibEuclidian, Distance};

macro_rules! euclidian_struct {
  ( feature_type: $feat:ty, array_type: $array_napi:ty ) => {
    paste! {
        #[napi(js_name=""[<Euclidian $feat:upper>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<Euclidian $feat:upper>] {
            inner: LibEuclidian<$feat>,
        }

        #[napi]
        impl [<Euclidian $feat:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibEuclidian::<$feat>::new()
                }
            }

            #[napi]
            pub fn distance(&self, x: $array_napi, y: $array_napi) -> f64 {
                let x = x.to_vec();
                let y = y.to_vec();
                self.inner.distance(&x, &y)
            }

            pub fn owned_inner(&self) -> LibEuclidian<$feat> {
                self.inner.to_owned()
            }
        }
    }
  };
}

// Works best with floating point numbers
// f64 - high precision requirements
// f32 - speed, smaller memory footprint
// Works with integers but with a risk of precision loss especially in square root
// i32, i64
euclidian_struct! { feature_type: f32, array_type: Float32Array}
euclidian_struct! { feature_type: f64, array_type: Float64Array}
euclidian_struct! { feature_type: i32, array_type: Int32Array}
euclidian_struct! { feature_type: i64, array_type: BigInt64Array}

// Added to support DBSCANParameters.with_distance implementations for:
// HammingU8, HammingU16, ManhattanU64, ManhattanU32
euclidian_struct! { feature_type: u8, array_type: Uint8Array}
euclidian_struct! { feature_type: u16, array_type: Uint16Array}
euclidian_struct! { feature_type: u32, array_type: Uint32Array}
euclidian_struct! { feature_type: u64, array_type: BigUint64Array}
