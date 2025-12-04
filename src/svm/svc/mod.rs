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
  svm::svc::{SVCParameters as LibSVCParameters, SVC as LibSVC},
};

use crate::linalg::basic::matrix::DenseMatrixF64;
use parameters::SVCParametersF64I64;

macro_rules! svm_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $inner_xs:ty ) => {
    paste! {
        #[napi(js_name = [<"SVC" $x:upper $y:upper>])]
        pub struct [<SVC $x:upper $y:upper>] {
            x_matrix: SharedReference<$xs, &'static DenseMatrix<$x>>,
            y_data: Vec<$y>,
            parameters: SharedReference<[<SVCParameters $x:upper $y:upper>], &'static LibSVCParameters<$x, $y, DenseMatrix<$x>, Vec<$y>>>,
            inner: Option<SharedReference<[<SVCParameters $x:upper $y:upper>],LibSVC<'static, $x, $y, DenseMatrix<$x>, Vec<$y>>>>,
        }

        #[napi]
        impl [<SVC $x:upper $y:upper>] {

            #[napi(factory)]
            pub fn set_fit_data(
                x_ref: Reference<$xs>,
                y_ref: Reference<$ys>,
                parameters_ref: Reference<[<SVCParameters $x:upper $y:upper>]>,
                env: Env
            ) -> Result<Self> {
                let x_matrix = x_ref.share_with(env, |x| {
                    Ok(&**x)
                })?;

                let y_data: Vec<$y> = {
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
                    LibSVC::fit(
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
            pub fn predict(&self, x_ref: Reference<$xs>, env: Env) -> Result<$inner_xs> {
                let x_matrix = x_ref.share_with(env, |x| {
                    Ok(&**x)
                })?;

                let inner = self.inner.as_ref()
                    .ok_or_else(|| Error::new(Status::GenericFailure, "Model not fitted"))?;

                let prediction = inner.predict(&**x_matrix)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("SVM predict failed: {}", e)))?;

                Ok($inner_xs::new(prediction))
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

svm_struct! {f64, i64, DenseMatrixF64, BigInt64Array, Float64Array}
