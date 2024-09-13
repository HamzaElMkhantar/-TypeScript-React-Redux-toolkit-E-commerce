import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../..';

// ? optimizations for the cart quantity function for rendering just one when the cart items changes
const getCartTotalQuantitySelector = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
      const handleItems = Object.entries(items);
      const totalItems = handleItems.reduce((acc, itm) => acc + itm[1], 0);
  
      return totalItems;
    }
  );

  export {getCartTotalQuantitySelector}