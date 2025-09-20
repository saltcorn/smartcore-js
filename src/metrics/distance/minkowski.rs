use napi::bindgen_prelude::{BigInt64Array, Float64Array};
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{minkowski::Minkowski as LibMinkowski, Distance};

macro_rules! minkowski_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi(js_name=""[<Minkowski $ty:upper>]"")]
        #[derive(Debug, Clone)]
        pub struct [<Minkowski $ty:upper>] {
            inner: LibMinkowski<$ty>,
        }

        #[napi]
        impl [<Minkowski $ty:upper>] {
            #[napi(constructor)]
            pub fn new(p: u32) -> Self {
                Self {
                    inner: LibMinkowski::<$ty>::new(p as u16)
                }
            }

            pub fn owned_inner(&self) -> LibMinkowski<$ty> {
                self.inner.to_owned()
            }
        }
    }
  };
}

macro_rules! minkowski_distance_impl {
  ( $ty:ty, $x:ty, $y:ty ) => {
    paste! {
        #[napi]
        impl [<Minkowski $ty:upper>] {
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

minkowski_struct! {i64}
minkowski_distance_impl! {i64, BigInt64Array, BigInt64Array}

minkowski_struct! {f64}
minkowski_distance_impl! {f64, Float64Array, Float64Array}
