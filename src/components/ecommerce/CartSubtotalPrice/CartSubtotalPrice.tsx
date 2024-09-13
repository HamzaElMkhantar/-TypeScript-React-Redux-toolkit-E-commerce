import { TProductResponse } from "@customTypes/productsTypes";
import styles from "./style.module.css";

type TCartSubtotalPriceProps = { products: TProductResponse[] };
function CartSubtotalPrice({ products }: TCartSubtotalPriceProps) {
  const Subtotal = products.reduce((accumulator, product) => {
    const price = product.price;
    const quantity = product.quantity;

    if (quantity && typeof quantity === "number")
      return accumulator + price * quantity;

    return accumulator;
  }, 0);
  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{Subtotal}$</span>
    </div>
  );
}

export default CartSubtotalPrice;
