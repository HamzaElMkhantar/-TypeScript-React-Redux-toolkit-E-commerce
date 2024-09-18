import axiosInstance from "@api/axiosInstance";
import { handleError } from "@utils/handleAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

import { TProductResponse } from "@customTypes/productsTypes";

type TResponse = TProductResponse[];
const actGetWishlist = createAsyncThunk("getWishlist", async (_, thunkAPI) => {
  const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
  const {
    wishlist: { itemsIs },
  } = getState() as RootState;

  if (itemsIs.length === 0) {
    return fulfillWithValue([]);
  }

  try {
    let res: TResponse = [];
    await Promise.all(
      itemsIs.map(async (el) => {
        const response = await axiosInstance.get<TResponse>(
          `/products?id=${el}`,
          { signal }
        );

        const { data } = response;
        res = [...res, ...data];
      })
    );

    return res;
  } catch (err) {
    return rejectWithValue(handleError(err));
  }
});

export default actGetWishlist;
