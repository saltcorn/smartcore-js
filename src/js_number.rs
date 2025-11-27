use napi::bindgen_prelude::*;
use napi_derive::napi;

#[derive(Debug, Clone)]
enum NumberInner {
  Float(f64),
  Int(BigInt),
}

#[napi]
#[derive(Debug, Clone)]
pub struct JsNumber {
  inner: NumberInner,
}

#[napi]
impl JsNumber {
  #[napi(factory)]
  pub fn float(no: f64) -> Self {
    Self {
      inner: NumberInner::Float(no),
    }
  }

  #[napi(factory)]
  pub fn int(no: BigInt) -> Self {
    Self {
      inner: NumberInner::Int(no),
    }
  }
}

impl TryFrom<&JsNumber> for f64 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(no) => Ok(*no),
      NumberInner::Int(no) => {
        let (no, _) = no.get_i128();

        // Lossless conversion to f64 (Numbers within the u32::MAX && i32::MIN range)
        if no > i32::MAX as i128 && no <= u32::MAX as i128 {
          return Ok(f64::from(no as u32));
        } else if no >= i32::MIN as i128 && no <= i32::MAX as i128 {
          return Ok(f64::from(no as i32));
        }

        // Lossy conversion to f64
        if no < f64::MAX as i128 && no > f64::MIN as i128 {
          return Ok(no as f64);
        }

        return Err(Error::new(
          Status::GenericFailure,
          "Failed to convert JsNumber to f64. Out of range.",
        ));
      }
    }
  }
}

impl TryFrom<&JsNumber> for f32 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(no) => {
        if *no > f32::MAX as f64 {
          return Err(Error::new(
            Status::GenericFailure,
            "Failed to convert JsNumber to f32. Out of range.",
          ));
        }
        Ok(*no as f32)
      }
      NumberInner::Int(no) => {
        let (no, _) = no.get_i64();

        // Lossless conversion to f64 (Numbers within the u16::MAX && i16::MIN range)
        if no > i16::MAX as i64 && no <= u16::MAX as i64 {
          return Ok(f32::from(no as u16));
        } else if no >= i16::MIN as i64 && no <= i16::MAX as i64 {
          return Ok(f32::from(no as i16));
        }

        // Lossy conversion to f64
        if no < f32::MAX as i64 && no > f32::MIN as i64 {
          return Ok(no as f32);
        }

        return Err(Error::new(
          Status::GenericFailure,
          "Failed to convert JsNumber to f32. Out of range.",
        ));
      }
    }
  }
}

impl TryFrom<&JsNumber> for u64 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (_, no, _) = big_int.get_u64();
        Ok(no)
      }
    }
  }
}

impl TryFrom<&JsNumber> for i64 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (no, _) = big_int.get_i64();
        Ok(no)
      }
    }
  }
}

impl TryFrom<&JsNumber> for u32 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (_, no, _) = big_int.get_u64();
        match no >= u32::MAX as u64 && no <= u32::MIN as u64 {
          true => Ok(no as u32),
          false => Err(Error::new(
            Status::GenericFailure,
            "Could not convert JsNumber to u32. Out of range.",
          )),
        }
      }
    }
  }
}

impl TryFrom<&JsNumber> for i32 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (no, _) = big_int.get_i64();
        match no >= i32::MAX as i64 && no <= i32::MIN as i64 {
          true => Ok(no as i32),
          false => Err(Error::new(
            Status::GenericFailure,
            "Could not convert JsNumber to i32. Out of range.",
          )),
        }
      }
    }
  }
}

impl TryFrom<&JsNumber> for u16 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (_, no, _) = big_int.get_u64();
        match no >= u16::MAX as u64 && no <= u16::MIN as u64 {
          true => Ok(no as u16),
          false => Err(Error::new(
            Status::GenericFailure,
            "Could not convert JsNumber to u16. Out of range.",
          )),
        }
      }
    }
  }
}

impl TryFrom<&JsNumber> for i16 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (no, _) = big_int.get_i64();
        match no >= i16::MAX as i64 && no <= i16::MIN as i64 {
          true => Ok(no as i16),
          false => Err(Error::new(
            Status::GenericFailure,
            "Could not convert JsNumber to i16. Out of range.",
          )),
        }
      }
    }
  }
}

impl TryFrom<&JsNumber> for u8 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (_, no, _) = big_int.get_u64();
        match no >= u8::MAX as u64 && no <= u8::MIN as u64 {
          true => Ok(no as u8),
          false => Err(Error::new(
            Status::GenericFailure,
            "Could not convert JsNumber to u8. Out of range.",
          )),
        }
      }
    }
  }
}

impl TryFrom<&JsNumber> for i8 {
  type Error = Error;

  fn try_from(value: &JsNumber) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      NumberInner::Float(_) => Err(Error::new(
        Status::GenericFailure,
        "Could not convert float JsNumber to integer.",
      )),
      NumberInner::Int(big_int) => {
        let (no, _) = big_int.get_i64();
        match no >= i8::MAX as i64 && no <= i8::MIN as i64 {
          true => Ok(no as i8),
          false => Err(Error::new(
            Status::GenericFailure,
            "Could not convert JsNumber to i8. Out of range.",
          )),
        }
      }
    }
  }
}
