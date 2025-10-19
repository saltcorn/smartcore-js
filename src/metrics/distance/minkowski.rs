use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{minkowski::Minkowski as LibMinkowski, Distance};

macro_rules! minkowski_struct {
  ( $feat:ty, $array_napi:ty ) => {
    paste! {
        #[napi(js_name=""[<Minkowski $feat:upper>]"")]
        #[derive(Debug, Clone)]
        pub struct [<Minkowski $feat:upper>] {
            inner: LibMinkowski<$feat>,
        }

        #[napi]
        impl [<Minkowski $feat:upper>] {
            #[napi(constructor)]
            pub fn new(p: u32) -> Self {
                Self {
                    inner: LibMinkowski::<$feat>::new(p as u16)
                }
            }

            pub fn owned_inner(&self) -> LibMinkowski<$feat> {
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

// Type choise depends on p parameter
// p = any -> f64 | f32
// p = 1 -> i32 // manhattan
// p = 2 -> i32 // Euclidian
// Integer with any other value of p is nonsensical

minkowski_struct! {f32, Float32Array}
minkowski_struct! {f64, Float64Array}
minkowski_struct! {i32, Int32Array}
minkowski_struct! {i64, BigInt64Array}
