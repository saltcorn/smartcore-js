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
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $inner_xs:ty ) => {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name = [<"SVC" $x:upper $y:upper>])]
        pub struct [<SVC $x:upper $y:upper>] {
            x_matrix: SharedReference<$xs, &'static DenseMatrix<$x>>,
            y_data: Vec<$y>,
            parameters: SharedReference<[<SVCParameters $x:upper $y:upper>], &'static LibSVCParameters<$x, $y, DenseMatrix<$x>, Vec<$y>>>,
            inner: Option<SharedReference<[<SVCParameters $x:upper $y:upper>],LibSVC<'static, $x, $y, DenseMatrix<$x>, Vec<$y>>>>,
            inner: Option<LibSVC<'static, $x, $y, DenseMatrix<$x>, Vec<$y>>>,
        }

        #[napi]
        impl [<SVC $x:upper $y:upper>] {

            #[napi(factory)]
            pub fn set_fit_data(
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
                    Ok(params.inner())
                })?;

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
                    inner: None,
                    inner: Some(model),
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
            pub fn predict(&self, x_ref: Reference<$xs>, env: Env) -> Result<Vec<$x>> {
                let x_matrix = x_ref.share_with(env, |x| {
                    Ok(&**x)
                })?;

                let inner = self.inner.as_ref()
                    .ok_or_else(|| Error::new(Status::GenericFailure, "Model not fitted"))?;

                let prediction = inner.predict(&**x_matrix)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("SVM predict failed: {}", e)))?;

                Ok($inner_xs::new(prediction))
                Ok(prediction)
            }
        }
    }
  };
}

svm_struct! {f32, u32, DenseMatrixF32, Uint32Array, Float32Array}
svm_struct! {f64, u64, DenseMatrixF64, BigUint64Array, Float64Array}
svm_struct! {f32, u32, DenseMatrixF32, Uint32Array}
svm_struct! {f64, u64, DenseMatrixF64, BigUint64Array}
