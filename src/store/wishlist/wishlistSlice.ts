import { IWishlistState } from "@customTypes/wishlistTypes";
import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act(thunk)/actLikeToggle";
import { handleError } from "@utils/handleAxiosError";
import actGetWishlist from "./act(thunk)/actGetWishlist";
import { ELoadingState } from "@customTypes/shared";

const initialState: IWishlistState = {
  itemsIs: [],
  productsFullInfo: [],
  loading: ELoadingState.Idle,
  error: null,
};

const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    CleanWishlistProductsFullInfo: (state) => {
        state.productsFullInfo = [];
        state.loading = ELoadingState.Idle;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.loading = ELoadingState.Pending;
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      state.loading = ELoadingState.Succeeded;
      if (action.payload.type === "add") {
        state.itemsIs.push(action.payload.id);
      }
      if (action.payload.type === "remove") {
        state.itemsIs = state.itemsIs.filter(
          (item) => item !== action.payload.id
        );
        state.productsFullInfo = state.productsFullInfo.filter(
          (item) => item.id!== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      state.loading = ELoadingState.Failed;
      state.error = handleError(action.payload);
    });
    // get wishlist items

    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = ELoadingState.Pending;
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = ELoadingState.Succeeded;
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = ELoadingState.Failed;
      state.error = handleError(action.payload);
    });
  },
});

export { actLikeToggle, actGetWishlist };
export const { CleanWishlistProductsFullInfo } = wishlist.actions;
export default wishlist.reducer;