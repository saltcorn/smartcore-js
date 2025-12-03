use napi::{Error, Result, Status};

use crate::typed_array::{TypedArrayType, TypedArrayWrapper};

pub enum MatchedArrays {
  F64(Vec<f64>, Vec<f64>),
  F32(Vec<f32>, Vec<f32>),
  I64(Vec<i64>, Vec<i64>),
  U64(Vec<u64>, Vec<u64>),
  I32(Vec<i32>, Vec<i32>),
  U32(Vec<u32>, Vec<u32>),
  U16(Vec<u16>, Vec<u16>),
  U8(Vec<u8>, Vec<u8>),
}

/// Logic
/// - Integer vs Float, Output => Float
/// - Small Integer vs Large Integer, Output => Large Integer
/// - Signed vs Unsigned, Output => Signed
pub fn match_array_type(
  y_true: TypedArrayWrapper,
  y_pred: TypedArrayWrapper,
  losslessly: Option<bool>,
) -> Result<MatchedArrays> {
  let losslessly = losslessly.unwrap_or(true);
  match y_true.r#type() {
    TypedArrayType::F64 => {
      let y_true: Vec<f64> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => {
          let y_pred: Vec<f64> = y_pred.try_into()?;
          y_pred
        }
        TypedArrayType::F32 => {
          let y_pred: Vec<f32> = y_pred.try_into()?;
          y_pred.into_iter().map(f64::from).collect::<Vec<f64>>()
        }
        TypedArrayType::I64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i64 values to f64.",
            ))
          }
          false => {
            let y_pred: Vec<i64> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as f64).collect::<Vec<f64>>()
          }
        },
        TypedArrayType::U64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to f64.",
            ))
          }
          false => {
            let y_pred: Vec<u64> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as f64).collect::<Vec<f64>>()
          }
        },
        TypedArrayType::I32 => {
          let y_pred: Vec<i32> = y_pred.try_into()?;
          y_pred.into_iter().map(f64::from).collect::<Vec<f64>>()
        }
        TypedArrayType::U32 => {
          let y_pred: Vec<u32> = y_pred.try_into()?;
          y_pred.into_iter().map(f64::from).collect::<Vec<f64>>()
        }
        TypedArrayType::U16 => {
          let y_pred: Vec<u32> = y_pred.try_into()?;
          y_pred.into_iter().map(f64::from).collect::<Vec<f64>>()
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred.into_iter().map(f64::from).collect::<Vec<f64>>()
        }
      };
      Ok(MatchedArrays::F64(y_true, y_pred))
    }
    TypedArrayType::F32 => {
      let y_true: Vec<f32> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => {
          let y_pred: Vec<f64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(f64::from).collect::<Vec<f64>>();
          return Ok(MatchedArrays::F64(y_true, y_pred));
        }
        TypedArrayType::F32 => {
          let y_pred: Vec<f32> = y_pred.try_into()?;
          y_pred
        }
        TypedArrayType::I64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i64 values to f32.",
            ))
          }
          false => {
            let y_pred: Vec<i64> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as f32).collect::<Vec<f32>>()
          }
        },
        TypedArrayType::U64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to f32.",
            ))
          }
          false => {
            let y_pred: Vec<u64> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as f32).collect::<Vec<f32>>()
          }
        },
        TypedArrayType::I32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i32 values to f32.",
            ))
          }
          false => {
            let y_pred: Vec<i32> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as f32).collect::<Vec<f32>>()
          }
        },
        TypedArrayType::U32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u32 values to f32.",
            ))
          }
          false => {
            let y_pred: Vec<u32> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as f32).collect::<Vec<f32>>()
          }
        },
        TypedArrayType::U16 => {
          let y_pred: Vec<u16> = y_pred.try_into()?;
          y_pred.into_iter().map(f32::from).collect::<Vec<f32>>()
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred.into_iter().map(f32::from).collect::<Vec<f32>>()
        }
      };
      Ok(MatchedArrays::F32(y_true, y_pred))
    }
    TypedArrayType::I64 => {
      let y_true: Vec<i64> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i64 values to f64.",
            ))
          }
          false => {
            let y_pred: Vec<f64> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|v| v as f64).collect::<Vec<f64>>();
            return Ok(MatchedArrays::F64(y_true, y_pred));
          }
        },
        TypedArrayType::F32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i64 values to f32.",
            ))
          }
          false => {
            let y_pred: Vec<f32> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|v| v as f32).collect::<Vec<f32>>();
            return Ok(MatchedArrays::F32(y_true, y_pred));
          }
        },
        TypedArrayType::I64 => {
          let y_pred: Vec<i64> = y_pred.try_into()?;
          y_pred
        }
        TypedArrayType::U64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to i64.",
            ))
          }
          false => {
            let y_pred: Vec<u64> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as i64).collect::<Vec<i64>>()
          }
        },
        TypedArrayType::I32 => {
          let y_pred: Vec<i32> = y_pred.try_into()?;
          y_pred.into_iter().map(i64::from).collect::<Vec<i64>>()
        }
        TypedArrayType::U32 => {
          let y_pred: Vec<u32> = y_pred.try_into()?;
          y_pred.into_iter().map(i64::from).collect::<Vec<i64>>()
        }
        TypedArrayType::U16 => {
          let y_pred: Vec<u16> = y_pred.try_into()?;
          y_pred.into_iter().map(i64::from).collect::<Vec<i64>>()
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred.into_iter().map(i64::from).collect::<Vec<i64>>()
        }
      };
      Ok(MatchedArrays::I64(y_true, y_pred))
    }
    TypedArrayType::U64 => {
      let y_true: Vec<u64> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to f64.",
            ))
          }
          false => {
            let y_pred: Vec<f64> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|x| x as f64).collect::<Vec<f64>>();
            return Ok(MatchedArrays::F64(y_true, y_pred));
          }
        },
        TypedArrayType::F32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to f32.",
            ))
          }
          false => {
            let y_pred: Vec<f32> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|x| x as f32).collect::<Vec<f32>>();
            return Ok(MatchedArrays::F32(y_true, y_pred));
          }
        },
        TypedArrayType::I64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to i64.",
            ))
          }
          false => {
            let y_pred: Vec<i64> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|x| x as i64).collect::<Vec<i64>>();
            return Ok(MatchedArrays::I64(y_true, y_pred));
          }
        },
        TypedArrayType::U64 => {
          let y_pred: Vec<u64> = y_pred.try_into()?;
          y_pred
        }
        TypedArrayType::I32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to i32.",
            ))
          }
          false => {
            let y_pred: Vec<i32> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|x| x as i32).collect::<Vec<i32>>();
            return Ok(MatchedArrays::I32(y_true, y_pred));
          }
        },
        TypedArrayType::U32 => {
          let y_pred: Vec<u32> = y_pred.try_into()?;
          y_pred.into_iter().map(u64::from).collect::<Vec<u64>>()
        }
        TypedArrayType::U16 => {
          let y_pred: Vec<u16> = y_pred.try_into()?;
          y_pred.into_iter().map(u64::from).collect::<Vec<u64>>()
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred.into_iter().map(u64::from).collect::<Vec<u64>>()
        }
      };
      Ok(MatchedArrays::U64(y_true, y_pred))
    }
    TypedArrayType::I32 => {
      let y_true: Vec<i32> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => {
          let y_pred: Vec<f64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(f64::from).collect::<Vec<f64>>();
          return Ok(MatchedArrays::F64(y_true, y_pred));
        }
        TypedArrayType::F32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i32 values to f32.",
            ))
          }
          false => {
            let y_pred: Vec<f32> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|v| v as f32).collect::<Vec<f32>>();
            return Ok(MatchedArrays::F32(y_true, y_pred));
          }
        },
        TypedArrayType::I64 => {
          let y_pred: Vec<i64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(i64::from).collect::<Vec<i64>>();
          return Ok(MatchedArrays::I64(y_true, y_pred));
        }
        TypedArrayType::U64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u64 values to i32.",
            ))
          }
          false => {
            let y_pred: Vec<u64> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as i32).collect::<Vec<i32>>()
          }
        },
        TypedArrayType::I32 => {
          let y_pred: Vec<i32> = y_pred.try_into()?;
          y_pred
        }
        TypedArrayType::U32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u32 values to i32.",
            ))
          }
          false => {
            let y_pred: Vec<u32> = y_pred.try_into()?;
            y_pred.into_iter().map(|v| v as i32).collect::<Vec<i32>>()
          }
        },
        TypedArrayType::U16 => {
          let y_pred: Vec<u16> = y_pred.try_into()?;
          y_pred.into_iter().map(i32::from).collect::<Vec<i32>>()
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred.into_iter().map(i32::from).collect::<Vec<i32>>()
        }
      };
      Ok(MatchedArrays::I32(y_true, y_pred))
    }
    TypedArrayType::U32 => {
      let y_true: Vec<u32> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => {
          let y_pred: Vec<f64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(f64::from).collect::<Vec<f64>>();
          return Ok(MatchedArrays::F64(y_true, y_pred));
        }
        TypedArrayType::F32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert u32 values to f32.",
            ));
          }
          false => {
            let y_pred: Vec<f32> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|x| x as f32).collect::<Vec<f32>>();
            return Ok(MatchedArrays::F32(y_true, y_pred));
          }
        },
        TypedArrayType::I64 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i64 values to u32.",
            ))
          }
          false => {
            let y_pred: Vec<i64> = y_pred.try_into()?;
            y_pred.into_iter().map(|x| x as u32).collect::<Vec<u32>>()
          }
        },
        TypedArrayType::U64 => {
          let y_pred: Vec<u64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(u64::from).collect::<Vec<u64>>();
          return Ok(MatchedArrays::U64(y_true, y_pred));
        }
        TypedArrayType::I32 => match losslessly {
          true => {
            return Err(Error::new(
              Status::InvalidArg,
              "Cannot losslessly convert i32 values to u32.",
            ))
          }
          false => {
            let y_pred: Vec<i32> = y_pred.try_into()?;
            let y_true = y_true.into_iter().map(|x| x as i32).collect::<Vec<i32>>();
            return Ok(MatchedArrays::I32(y_true, y_pred));
          }
        },
        TypedArrayType::U32 => {
          let y_pred: Vec<u32> = y_pred.try_into()?;
          y_pred
        }
        TypedArrayType::U16 => {
          let y_pred: Vec<u16> = y_pred.try_into()?;
          y_pred.into_iter().map(u32::from).collect::<Vec<u32>>()
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred.into_iter().map(u32::from).collect::<Vec<u32>>()
        }
      };
      Ok(MatchedArrays::U32(y_true, y_pred))
    }
    TypedArrayType::U16 => {
      let y_true: Vec<u16> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => {
          let y_pred: Vec<f64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(f64::from).collect::<Vec<f64>>();
          return Ok(MatchedArrays::F64(y_true, y_pred));
        }
        TypedArrayType::F32 => {
          let y_pred: Vec<f32> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(f32::from).collect::<Vec<f32>>();
          return Ok(MatchedArrays::F32(y_true, y_pred));
        }
        TypedArrayType::I64 => {
          let y_true = y_true.into_iter().map(i64::from).collect::<Vec<i64>>();
          let y_pred: Vec<i64> = y_pred.try_into()?;
          return Ok(MatchedArrays::I64(y_true, y_pred));
        }
        TypedArrayType::U64 => {
          let y_pred: Vec<u64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(u64::from).collect::<Vec<u64>>();
          return Ok(MatchedArrays::U64(y_true, y_pred));
        }
        TypedArrayType::I32 => {
          let y_pred: Vec<i32> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(i32::from).collect::<Vec<i32>>();
          return Ok(MatchedArrays::I32(y_true, y_pred));
        }
        TypedArrayType::U32 => {
          let y_pred: Vec<u32> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(u32::from).collect::<Vec<u32>>();
          return Ok(MatchedArrays::U32(y_true, y_pred));
        }
        TypedArrayType::U16 => {
          let y_pred: Vec<u16> = y_pred.try_into()?;
          y_pred
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred.into_iter().map(u16::from).collect::<Vec<u16>>()
        }
      };
      Ok(MatchedArrays::U16(y_true, y_pred))
    }
    TypedArrayType::U8 => {
      let y_true: Vec<u8> = y_true.try_into()?;
      let y_pred = match y_pred.r#type() {
        TypedArrayType::F64 => {
          let y_pred: Vec<f64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(f64::from).collect::<Vec<f64>>();
          return Ok(MatchedArrays::F64(y_true, y_pred));
        }
        TypedArrayType::F32 => {
          let y_pred: Vec<f32> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(f32::from).collect::<Vec<f32>>();
          return Ok(MatchedArrays::F32(y_true, y_pred));
        }
        TypedArrayType::I64 => {
          let y_true = y_true.into_iter().map(i64::from).collect::<Vec<i64>>();
          let y_pred: Vec<i64> = y_pred.try_into()?;
          return Ok(MatchedArrays::I64(y_true, y_pred));
        }
        TypedArrayType::U64 => {
          let y_pred: Vec<u64> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(u64::from).collect::<Vec<u64>>();
          return Ok(MatchedArrays::U64(y_true, y_pred));
        }
        TypedArrayType::I32 => {
          let y_pred: Vec<i32> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(i32::from).collect::<Vec<i32>>();
          return Ok(MatchedArrays::I32(y_true, y_pred));
        }
        TypedArrayType::U32 => {
          let y_pred: Vec<u32> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(u32::from).collect::<Vec<u32>>();
          return Ok(MatchedArrays::U32(y_true, y_pred));
        }
        TypedArrayType::U16 => {
          let y_pred: Vec<u16> = y_pred.try_into()?;
          let y_true = y_true.into_iter().map(u16::from).collect::<Vec<u16>>();
          return Ok(MatchedArrays::U16(y_true, y_pred));
        }
        TypedArrayType::U8 => {
          let y_pred: Vec<u8> = y_pred.try_into()?;
          y_pred
        }
      };
      Ok(MatchedArrays::U8(y_true, y_pred))
    }
  }
}
