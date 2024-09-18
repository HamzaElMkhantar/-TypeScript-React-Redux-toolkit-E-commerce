import { createSlice } from "@reduxjs/toolkit";
import { ICategoriesState } from "../../types/categoriesTypes";
import { ELoadingState } from "../../types/shared";
import actGetCategories from "./act(thunk)/actGetCatgories";
import { handleError } from "@utils/handleAxiosError";


const initialState: ICategoriesState = {
  records: [],
  loading: ELoadingState.Idle,
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = ELoadingState.Pending;
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = ELoadingState.Succeeded;
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = ELoadingState.Failed;
      state.error = handleError(action.payload);
    });
  },
});

export { actGetCategories };
export default categoriesSlice.reducer;
