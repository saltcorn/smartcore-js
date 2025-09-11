use napi::bindgen_prelude::{
  BigInt64Array, BigUint64Array, Float32Array, Float64Array, Int32Array, Uint32Array,
};
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{hamming::Hamming as LibHamming, Distance};

macro_rules! hamming_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi(js_name=""[<Hamming $ty:upper>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<Hamming $ty:upper>] {
            inner: LibHamming<$ty>,
        }

        #[napi]
        impl [<Hamming $ty:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibHamming::<$ty>::new()
                }
            }

            pub fn owned_inner(&self) -> LibHamming<$ty> {
                self.inner.to_owned()
            }
        }
    }
  };
}

macro_rules! hamming_distance_impl {
  ( $ty:ty, $x:ty, $y:ty ) => {
    paste! {
        #[napi]
        impl [<Hamming $ty:upper>] {
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

hamming_struct! {u32}
hamming_distance_impl! {u32, Uint32Array, Uint32Array}

hamming_struct! {i32}
hamming_distance_impl! {i32, Int32Array, Int32Array}

hamming_struct! {u64}
hamming_distance_impl! {u64, BigUint64Array, BigUint64Array}

hamming_struct! {i64}
hamming_distance_impl! {i64, BigInt64Array, BigInt64Array}

hamming_struct! {f32}
hamming_distance_impl! {f32, Float32Array, Float32Array}

hamming_struct! {f64}
hamming_distance_impl! {f64, Float64Array, Float64Array}
