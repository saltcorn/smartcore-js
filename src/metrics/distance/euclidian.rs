use napi::bindgen_prelude::{
  BigInt64Array, BigUint64Array, Float32Array, Float64Array, Int32Array, Uint32Array,
};
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{euclidian::Euclidian as LibEuclidian, Distance};

macro_rules! euclidian_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi]
        #[derive(Debug, Clone, Default)]
        pub struct [<Euclidian $ty>] {
            inner: LibEuclidian<$ty>,
        }

        #[napi]
        impl [<Euclidian $ty>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibEuclidian::<$ty>::new()
                }
            }
        }
    }
  };
}

macro_rules! euclidian_distance_impl {
  ( $ty:ty, $x:ty, $y:ty ) => {
    paste! {
        #[napi]
        impl [<Euclidian $ty>] {
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

euclidian_struct! {u32}
euclidian_distance_impl! {u32, Uint32Array, Uint32Array}

euclidian_struct! {i32}
euclidian_distance_impl! {i32, Int32Array, Int32Array}

euclidian_struct! {u64}
euclidian_distance_impl! {u64, BigUint64Array, BigUint64Array}

euclidian_struct! {i64}
euclidian_distance_impl! {i64, BigInt64Array, BigInt64Array}

euclidian_struct! {f32}
euclidian_distance_impl! {f32, Float32Array, Float32Array}

euclidian_struct! {f64}
euclidian_distance_impl! {f64, Float64Array, Float64Array}
