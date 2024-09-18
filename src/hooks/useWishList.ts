import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  CleanWishlistProductsFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
const useWishList = () => {
  const { error, loading, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetWishlist());

    return () => {
      dispatch(CleanWishlistProductsFullInfo());
      promise.abort(); // ?`createAsyncThunk` attaches an `abort()` method to the promise 

    };
  }, [dispatch]);
  const productFullInfo = productsFullInfo.map((el) => ({
    ...el,
    isLiked: true,
  }));
  return { error, loading, productFullInfo };
};

export default useWishList;
