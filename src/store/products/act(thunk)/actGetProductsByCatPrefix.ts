import axiosInstance from "@api/axiosInstance";
import handleAxiosError from "@api/handleAxiosError";
import { TProductResponse } from "@customTypes/productsTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TResponse = TProductResponse[];
const getProductsByCatPrefix = createAsyncThunk(
  "getProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const  {rejectWithValue} = thunkAPI;
    try{
        const res = await axiosInstance.get<TResponse>(`/products?cat_prefix=${prefix}`)

        return res.data;
    }catch(err){
        return rejectWithValue(handleAxiosError(err));
    }
  }
);

export default getProductsByCatPrefix;
