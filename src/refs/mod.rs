use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;

use crate::dataset::{DatasetF32F32, DatasetF32U32, DatasetF64F64, DatasetF64U64};

macro_rules! js_vec_ref {
  ( $provider:ty, $t:ty ) => {
    paste! {
        pub struct [<$provider VecRef>]<'a> {
            inner: &'a Vec<$t>
        }

        impl<'a> [<$provider VecRef>]<'a> {
            pub fn inner(&self) -> &Vec<$t> {
                self.inner
            }
        }

        impl<'a> From<&'a Vec<$t>> for [<$provider VecRef>]<'a> {
            fn from(inner: &'a Vec<$t>) -> Self {
                Self { inner }
            }
        }

        #[napi]
        pub struct [<$provider JsVecRef>] {
            inner: SharedReference<$provider, [<$provider VecRef>]<'static>>
        }

        impl AsRef<Vec<$t>> for [<$provider JsVecRef>] {
            fn as_ref(&self) -> &Vec<$t> {
                self.inner.inner()
            }
        }

        impl From<SharedReference<$provider, [<$provider VecRef>]<'static>>> for [<$provider JsVecRef>] {
            fn from(inner: SharedReference<$provider, [<$provider VecRef>]<'static>>) -> Self {
                Self { inner }
            }
        }
    }
  };
}

js_vec_ref! {DatasetF32F32, f32}
js_vec_ref! {DatasetF32U32, u32}
js_vec_ref! {DatasetF64F64, f64}
js_vec_ref! {DatasetF64U64, u64}
