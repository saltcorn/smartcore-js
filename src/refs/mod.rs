use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;

use crate::dataset::{DatasetF64F64, DatasetF64I32};

macro_rules! js_vec_ref {
  ( $provider:ty, $t:ty, $ts_js:ty ) => {
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

        #[napi]
        impl [<$provider JsVecRef>] {
            #[napi]
            pub fn as_array(&self) -> $ts_js {
                $ts_js::with_data_copied(self.inner.inner)
            }
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

js_vec_ref! {DatasetF64F64, f64, Float64Array}
js_vec_ref! {DatasetF64I32, i64, BigInt64Array}

macro_rules! vec_ref {
  ( $t:ty, $ts_js:ty ) => {
    paste! {
        #[napi]
        pub struct [<Vec $t:upper>] {
            inner: Vec<$t>,
        }

        #[napi]
        impl [<Vec $t:upper>] {
            #[napi(constructor)]
            pub fn new(values: $ts_js) -> Self {
                Self {
                    inner: values.to_vec(),
                }
            }
        }

        pub struct [<Vec $t:upper Ref>]<'a> {
            inner: &'a Vec<$t>,
        }

        impl<'a> [<Vec $t:upper Ref>]<'a> {
            pub fn inner(&self) -> &Vec<$t> {
                self.inner
            }
        }

        #[napi]
        pub struct [<JsVec $t:upper Ref>] {
            inner: SharedReference<[<Vec $t:upper>], [<Vec $t:upper Ref>]<'static>>,
        }

        impl [<JsVec $t:upper Ref>] {
            pub fn inner(&self) -> &Vec<$t> {
                self.inner.inner()
            }
        }
    }
  };
}

vec_ref! {f64, Float64Array}
vec_ref! {i64, BigInt64Array}
