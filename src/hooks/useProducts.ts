import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  cleanUpProduct,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const useProducts = () => {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsIs);

  const productFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
  }));
  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(prefix as string)); // ? casting to string

    return () => {
      dispatch(cleanUpProduct()); // ! cleanup on unmount to prevent memory leaks
      promise.abort(); // ?`createAsyncThunk` attaches an `abort()` method to the promise 
    };
  }, [dispatch, prefix]);
  return {
    loading,
    error,
    productFullInfo,
    prefix
  };
};

export default useProducts;
