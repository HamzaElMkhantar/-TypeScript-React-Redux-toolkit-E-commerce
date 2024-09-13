import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@api/axiosInstance";
import handleAxiosError from "@api/handleAxiosError";
import { TCategoryResponse } from "@customTypes/categoriesTypes";
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get<TCategoryResponse[]>("categories");
      return res.data;
    } catch (e) {
      return rejectWithValue(handleAxiosError(e));
    }
  }
);
export default actGetCategories;
