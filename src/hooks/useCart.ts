import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cleanCartProductFullInfo,
  removeFromCart,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      dispatch(cleanCartProductFullInfo());
      promise.abort(); //?`createAsyncThunk` attaches an `abort()` method to the promise
    };
  }, [dispatch, items]);

  const products = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
       dispatch(removeFromCart(id));
    },
    [dispatch]
  );
  return { loading, error, products, changeQuantityHandler, removeItemHandler };
};

export default useCart;
