use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{euclidian::Euclidian as LibEuclidian, Distance};

macro_rules! euclidian_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi(js_name=""[<Euclidian $ty:upper>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<Euclidian $ty:upper>] {
            inner: LibEuclidian<$ty>,
        }

        #[napi]
        impl [<Euclidian $ty:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibEuclidian::<$ty>::new()
                }
            }

            pub fn owned_inner(&self) -> LibEuclidian<$ty> {
                self.inner.to_owned()
            }
        }
    }
  };
}

macro_rules! euclidian_distance_impl {
  ( $ty:ty, $x:ty, $y:ty ) => {
    paste! {
        #[napi]
        impl [<Euclidian $ty:upper>] {
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

euclidian_struct! {i64}
euclidian_distance_impl! {i64, BigInt64Array, BigInt64Array}

euclidian_struct! {u64}
euclidian_distance_impl! {u64, BigUint64Array, BigUint64Array}

euclidian_struct! {f64}
euclidian_distance_impl! {f64, Float64Array, Float64Array}
