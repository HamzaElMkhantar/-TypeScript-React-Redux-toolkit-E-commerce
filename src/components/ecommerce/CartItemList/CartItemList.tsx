import { TProductResponse } from "@customTypes/productsTypes";
import CartItem from "../CartItem/CartItem";

type TCartItemsListProps = {
  products: TProductResponse[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: TCartItemsListProps) => {
  const renderList = products.map((product) => {
    return (
      <CartItem
        key={product.id}
        {...product}
        changeQuantityHandler={changeQuantityHandler}
        removeItemHandler={removeItemHandler}
      />
    );
  });
  return <div>{renderList}</div>;
};

export default CartItemList;