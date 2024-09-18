import axiosInstance from "@api/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import { IWishlistResponse } from "@customTypes/wishlistTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TResponse = IWishlistResponse[];
const actLikeToggle = createAsyncThunk(
  "wishlist",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const isRecordExist = await axiosInstance.get<TResponse>(
        `/wishlist?productId=${id}&userId=1`
      );
      if (isRecordExist.data.length > 0) {
        await axiosInstance.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { id, type: "remove" };
      } else {
        await axiosInstance.post(`/wishlist`, { productId: id, userId: 1 });
        return { id, type: "add" };
      }
    } catch (e) {
      return rejectWithValue(handleAxiosError(e));
    }
  }
);

export default actLikeToggle;
