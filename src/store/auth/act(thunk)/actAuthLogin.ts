import axiosInstance from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAxiosError from "@utils/handleAxiosError";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.post<TResponse>(`/login`, formData);

      return response.data;  
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actAuthLogin;
