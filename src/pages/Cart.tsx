import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cleanUpCart,
  removeFromCart,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

function Cart() {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(actGetProductsByItems());

    return () => {
      dispatch(cleanUpCart());
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

  return (
    <>
      <Heading>
        Home
        <KeyboardArrowRightIcon
          style={{ fontSize: "25px", margin: "0", padding: "0" }}
        />
        Cart
      </Heading>
      <Loading status={loading} error={error}>
        {products.length > 0 ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <p>Your cart is Empty</p>
        )}
      </Loading>
    </>
  );
}

export default Cart;
