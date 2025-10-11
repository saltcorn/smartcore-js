use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::metrics::distance::{hamming::Hamming as LibHamming, Distance};

macro_rules! hamming_struct {
  (
    feature_type: $feat:ty,
    array_type: $array_napi:ty
  ) => {
    paste! {
        #[napi(js_name=""[<Hamming $feat:upper>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<Hamming $feat:upper>] {
            inner: LibHamming<$feat>,
        }

        #[napi]
        impl [<Hamming $feat:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibHamming::<$feat>::new()
                }
            }

            #[napi]
            pub fn distance(&self, x: $array_napi, y: $array_napi) -> f64 {
                let x = x.to_vec();
                let y = y.to_vec();
                self.inner.distance(&x, &y)
            }

            pub fn owned_inner(&self) -> LibHamming<$feat> {
                self.inner.to_owned()
            }
        }
    }
  };
}

// Hamming is designed for categorical features
// Values typically fall within the range 0 - 255
// Signed categories are rare
// Type Choice:
// u8 - ideal for categorical data
// u16 - where the number of categories exceed 256
// i32 - for cases where negative labels exist
hamming_struct! { feature_type: u8, array_type: Uint8Array}
hamming_struct! { feature_type: u16, array_type: Uint16Array}
hamming_struct! { feature_type: i32, array_type: Int32Array}
