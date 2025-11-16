use bincode::{config::standard, serde::decode_from_slice};

pub fn deserialize_variant<T>(data: &[u8]) -> Result<T, napi::Error>
where
  T: serde::de::DeserializeOwned,
{
  decode_from_slice(data, standard())
    .map_err(|e| napi::Error::new(napi::Status::GenericFailure, e.to_string()))
    .map(|(v, _)| v)
}
