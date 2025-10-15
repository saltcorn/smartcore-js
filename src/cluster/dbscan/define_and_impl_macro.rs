macro_rules! define_and_impl {
  (
    feature_type: $feat:ty,
    ids_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty,
    distance_type: $dist:ty,
    parameters_type: $params:ty,
    distance_export_type: $dist_napi:ty
  ) => {
    paste! {
        #[napi(js_name=""[<DBSCAN $feat:upper $id:upper $dist_napi>]"")]
        #[derive(Debug)]
        pub struct [<DBSCAN $feat:upper $id:upper $dist_napi>] {
            inner: LibDBSCAN<$feat, $id, DenseMatrix<$feat>, Vec<$id>, $dist>,
        }

        #[napi]
        impl [<DBSCAN $feat:upper $id:upper $dist_napi>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, parameters:&$params) -> Result<Self> {
                let inner = LibDBSCAN::<$feat, $id, DenseMatrix<$feat>, Vec<$id>, $dist>::fit(x, parameters.owned_inner())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$matrix) -> Result<$array> {
                let predict_result = self.inner.predict(x).map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($array::new(predict_result))
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibDBSCAN<$feat, $id, DenseMatrix<$feat>, Vec<$id>, $dist>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}
