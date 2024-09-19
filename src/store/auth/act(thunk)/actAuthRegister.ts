import axiosInstance from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAxiosError from "@utils/handleAxiosError";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Simulate API call
      const response = await axiosInstance.post(`/register`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actAuthRegister;
