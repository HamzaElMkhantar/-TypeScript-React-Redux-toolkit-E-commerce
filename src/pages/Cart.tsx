import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import { LottieHandler } from "@components/feedback";
import Loading from "@components/feedback/Loading/Loading";
import useCart from "@hooks/useCart";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Cart() {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useCart();

  return (
    <>
      <Heading>
        Home
        <KeyboardArrowRightIcon
          style={{ fontSize: "25px", margin: "0", padding: "0" }}
        />
        Cart
      </Heading>
      <Loading status={loading} error={error} type="cart">
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
          <LottieHandler type="empty" message="Your cart is Empty" />
        )}
      </Loading>
    </>
  );
}

export default Cart;
