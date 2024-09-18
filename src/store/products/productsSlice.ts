import { ELoadingState } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act(thunk)/actGetProductsByCatPrefix";
import { IProductsState } from "@customTypes/productsTypes";
import { handleError } from "@utils/handleAxiosError";


const initialState: IProductsState = {
  records: [],
  loading: ELoadingState.Idle,
  error: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProduct: (state) => {
      state.records = [];
      state.loading = ELoadingState.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = ELoadingState.Pending;
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = ELoadingState.Succeeded;
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = ELoadingState.Failed;
      state.error = handleError(action.payload);
    });
  },
});

export const { cleanUpProduct } = productsSlice.actions;
export { actGetProductsByCatPrefix };
export default productsSlice.reducer;
