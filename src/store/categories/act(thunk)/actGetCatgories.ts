import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@api/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import { TCategoryResponse } from "@customTypes/categoriesTypes";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axiosInstance.get<TCategoryResponse[]>("categories", {
        signal,
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(handleAxiosError(e));
    }
  }
);
export default actGetCategories;
