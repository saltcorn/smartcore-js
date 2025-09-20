use napi::bindgen_prelude::{BigInt64Array, Float64Array};
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{manhattan::Manhattan as LibManhattan, Distance};

macro_rules! manhattan_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi(js_name=""[<Manhattan $ty:upper>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<Manhattan $ty:upper>] {
            inner: LibManhattan<$ty>,
        }

        #[napi]
        impl [<Manhattan $ty:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibManhattan::<$ty>::new()
                }
            }

            pub fn owned_inner(&self) -> LibManhattan<$ty> {
                self.inner.to_owned()
            }
        }
    }
  };
}

macro_rules! manhattan_distance_impl {
  ( $ty:ty, $x:ty, $y:ty ) => {
    paste! {
        #[napi]
        impl [<Manhattan $ty:upper>] {
            #[napi]
            pub fn distance(&self, x: $x, y: $y) -> f64 {
                let x = x.to_vec();
                let y = y.to_vec();
                self.inner.distance(&x, &y)
            }
        }
    }
  };
}

manhattan_struct! {i64}
manhattan_distance_impl! {i64, BigInt64Array, BigInt64Array}

manhattan_struct! {f64}
manhattan_distance_impl! {f64, Float64Array, Float64Array}
