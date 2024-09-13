import axiosInstance from "@api/axiosInstance";
import handleAxiosError from "@api/handleAxiosError";
import { ICartResponse } from "@customTypes/cartTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

type TResponse = ICartResponse[];
const actGetProductsByItems = createAsyncThunk("cart", async (_, thunkAPI) => {
  const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
  const {
    cart: { items },
  } = getState() as RootState;

  //   If cart is empty, return empty array
  if (Object.keys(items).length === 0) {
    return fulfillWithValue([]);
  }

  // Filter products by items in cart
  const itemsId = Object.keys(items);
  // Construct query string for filtering products by ids in cart
  // let filterQueries = "";
  // if (itemsId.length > 0) {
  //   // filterQueries = `?id=${itemsId.join("&id=")}`;
  //   filterQueries = `${itemsId.map((id) => `id=${id}`).join("&")}`;
  //   console.log({ filterQueries });
  // }
  try {
    let res: TResponse = [];
    await Promise.all(
      itemsId.map(async (el) => {
        const response = await axiosInstance.get<TResponse>(
          `/products?id=${el}`
        );
        const { data } = response;
        res = [...res, ...data];
      })
    );

    return res;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err));
  }
});

export default actGetProductsByItems;
