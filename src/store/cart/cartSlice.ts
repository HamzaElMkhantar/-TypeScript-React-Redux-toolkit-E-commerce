import { ICartState } from "@customTypes/cartTypes";
import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from '..';
import actGetProductsByItems from "./act(thunk)/actGetProductsByItems";
import { getCartTotalQuantitySelector } from "@store/cart/selectors/cartSelectors";
import { ELoadingState } from "@customTypes/shared";
import { handleError } from "@api/handleAxiosError";

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  loading: ELoadingState.Idle,
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      }
      if (!state.items[id]) {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
      state.productFullInfo = state.productFullInfo.filter(
        (item) => item.id !== action.payload
      );
    },
    cleanUpCart: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = ELoadingState.Pending;
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = ELoadingState.Succeeded;
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = ELoadingState.Failed;
      state.error = handleError(action.payload);
    });
  },
});
 

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const { addToCart, cartItemChangeQuantity, removeFromCart, cleanUpCart } =
  cartSlice.actions;
export default cartSlice.reducer;
