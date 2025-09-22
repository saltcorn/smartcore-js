mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  svm::svr::{SVRParameters as LibSVRParameters, SVR as LibSVR},
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::{SVRParametersF32, SVRParametersF64};

macro_rules! svm_struct {
  ( $t:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name = [<"SVR" $t:upper>])]
        pub struct [<SVR $t:upper>] {
            x_matrix: SharedReference<$xs, &'static DenseMatrix<$t>>,
            y_data: Vec<$t>,
            parameters: SharedReference<[<SVRParameters $t:upper>], &'static LibSVRParameters<$t>>,
            inner: Option<SharedReference<[<SVRParameters $t:upper>], LibSVR<'static, $t, DenseMatrix<$t>, Vec<$t>>>>,
        }

        #[napi]
        impl [<SVR $t:upper>] {

            #[napi(factory)]
            pub fn set_fit_data(
                x_ref: Reference<$xs>,
                y_ref: Reference<$ys>,
                parameters_ref: Reference<[<SVRParameters $t:upper>]>,
                env: Env
            ) -> Result<Self> {
                let x_matrix = x_ref.share_with(env, |x| {
                    Ok(&**x)
                })?;

                let y_data: Vec<$t> = {
                    let y_shared = y_ref.share_with(env, |y_array| {
                        Ok(y_array.to_vec())
                    })?;
                    (*y_shared).clone()
                };

                let parameters = parameters_ref.share_with(env, |params| {
                    Ok(params.inner())
                })?;

                Ok(Self {
                    x_matrix,
                    y_data,
                    parameters,
                    inner: None,
                })
            }

            #[napi]
            pub fn fit(&'static mut self, env: Env) -> Result<()> {
                let x_matrix = self.x_matrix.clone(env)?.share_with(env, |x| {
                    Ok(&**x)
                })?;

                let model = self.parameters.clone(env)?.share_with(env, |params| {
                    LibSVR::fit(
                        &**x_matrix,
                        &self.y_data,
                        &*params
                    )
                    .map_err(|e| Error::new(Status::GenericFailure, format!("SVM fit failed: {}", e)))
                })?;

                self.inner = Some(model);

                Ok(())
            }

            #[napi]
            pub fn predict(&self, x_ref: Reference<$xs>, env: Env) -> Result<$ys> {
                let x_matrix = x_ref.share_with(env, |x| {
                    Ok(&**x)
                })?;

                let inner = self.inner.as_ref()
                    .ok_or_else(|| Error::new(Status::GenericFailure, "Model not fitted"))?;

                let prediction = inner.predict(&**x_matrix)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("SVM predict failed: {}", e)))?;

                Ok($ys::new(prediction))
            }

             #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let inner = self.inner.as_ref()
                    .ok_or_else(|| Error::new(Status::GenericFailure, "Model not fitted"))?;

                let encoded = encode_to_vec(&**inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                todo!()
                // let inner = decode_from_slice::<LibSVC<'static, $x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                //     .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                // Ok(Self { inner })
            }
        }
    }
  };
}

svm_struct! {f32, DenseMatrixF32, Float32Array}
svm_struct! {f64, DenseMatrixF64, Float64Array}
