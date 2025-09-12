mod parameters;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  svm::svc::{SVCParameters as LibSVCParameters, SVC as LibSVC},
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::{SVCParametersF32U32, SVCParametersF64U64};

macro_rules! svm_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name = [<"SVC" $x:upper $y:upper>])]
        pub struct [<SVC $x:upper $y:upper>] {
            x_matrix: SharedReference<$xs, &'static DenseMatrix<$x>>,
            y_data: Vec<$y>,
            parameters: SharedReference<[<SVCParameters $x:upper $y:upper>], &'static LibSVCParameters<$x, $y, DenseMatrix<$x>, Vec<$y>>>,
            inner: Option<LibSVC<'static, $x, $y, DenseMatrix<$x>, Vec<$y>>>,
        }

        #[napi]
        impl [<SVC $x:upper $y:upper>] {

            #[napi(factory)]
            pub fn fit(
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
                    Ok(&*params.inner())
                })?;

                let model = LibSVC::fit(
                    &**x_matrix,
                    &y_data,
                    &*parameters
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("SVM fit failed: {}", e)))?;

                Ok(Self {
                    x_matrix,
                    y_data,
                    parameters,
                    inner: Some(model),
                })
            }

            #[napi]
            pub fn predict(&self, x_ref: Reference<$xs>, env: Env) -> Result<Vec<$x>> {
                let x_matrix = x_ref.share_with(env, |x| {
                    Ok(&**x)
                })?;

                let inner = self.inner.as_ref()
                    .ok_or_else(|| Error::new(Status::GenericFailure, "Model not fitted"))?;

                let prediction = inner.predict(&**x_matrix)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("SVM predict failed: {}", e)))?;

                Ok(prediction)
            }
        }
    }
  };
}

svm_struct! {f32, u32, DenseMatrixF32, Uint32Array}
svm_struct! {f64, u64, DenseMatrixF64, BigUint64Array}
