import axiosInstance from "@api/axiosInstance";
import { TProductResponse } from "@customTypes/productsTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAxiosError from "@utils/handleAxiosError";

type TResponse = TProductResponse[];
const getProductsByCatPrefix = createAsyncThunk(
  "getProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axiosInstance.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

export default getProductsByCatPrefix;
