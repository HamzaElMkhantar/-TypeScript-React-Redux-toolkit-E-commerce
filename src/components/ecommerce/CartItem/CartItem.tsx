import { Form, Button } from "react-bootstrap";
import styles from "./style.module.css";
import { TProductResponse } from "@customTypes/productsTypes";
import { memo } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItemProps = TProductResponse & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    quantity,
    max,
    changeQuantityHandler,
    removeItemHandler,
  }: TCartItemProps) => {
    console.log("cartItem rendering");
    const renderOptions = Array(max)
      .fill(max)
      .map((_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ));

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };
    const removeItem = () => {
      removeItemHandler(id);
    };
    return (
      <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price?.toFixed(2)} EGP</h3>
            <h3>quantity:{quantity}</h3>
            <Button
              onClick={removeItem}
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={(e) => changeQuantity(e)}>
            {/* <option value="0">0</option> */}
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
