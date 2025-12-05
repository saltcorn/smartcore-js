use napi::bindgen_prelude::{Error, Result, Status};
use napi_derive::napi;

use crate::typed_array::{TypedArrayType, TypedArrayWrapper};

#[napi]
pub fn change_array_type(xs: TypedArrayWrapper, to: TypedArrayType) -> Result<TypedArrayWrapper> {
  match xs.r#type() {
    TypedArrayType::F64 => {
      let xs_slice: Vec<f64> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => Ok(TypedArrayWrapper::F64(xs_slice.into())),
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    TypedArrayType::F32 => {
      let xs_slice: Vec<f32> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => Ok(TypedArrayWrapper::F32(xs_slice.into())),
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    TypedArrayType::I64 => {
      let xs_slice: Vec<i64> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => Ok(TypedArrayWrapper::I64(xs_slice.into())),
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    TypedArrayType::U64 => {
      let xs_slice: Vec<u64> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => Ok(TypedArrayWrapper::U64(xs_slice.into())),
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    TypedArrayType::I32 => {
      let xs_slice: Vec<i32> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => Ok(TypedArrayWrapper::I32(xs_slice.into())),
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    TypedArrayType::U32 => {
      let xs_slice: Vec<u32> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => Ok(TypedArrayWrapper::U32(xs_slice.into())),
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    TypedArrayType::U16 => {
      let xs_slice: Vec<u16> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => Ok(TypedArrayWrapper::U16(xs_slice.into())),
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    TypedArrayType::U8 => {
      let xs_slice: Vec<u8> = xs.try_into()?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => Ok(TypedArrayWrapper::U8(xs_slice.into())),
      }
    }
  }
}
