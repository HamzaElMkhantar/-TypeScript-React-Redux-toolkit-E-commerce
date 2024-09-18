import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProductResponse } from "@customTypes/productsTypes";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState, memo } from "react";
import LikeFull from "@assets/svg/like.svg?react";
import Like from "@assets/svg/like-o.svg?react";
import { Link } from "react-router-dom";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
const { product, productImg, wishListButton } = styles;

const Product = memo(
  ({ id, title, price, img, max, quantity, isLiked }: TProductResponse) => {
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const currentRemainingQuantity = max && max - (quantity ?? 0);
    const quantityReachedToMax =
      (currentRemainingQuantity && currentRemainingQuantity <= 0) || false;

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisable(true);
    };
    useEffect(() => {
      if (!isBtnDisable) return;

      const debounce = setTimeout(() => {
        setIsBtnDisable(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisable]);
    const actLikeToggleHandler = () => {
      if(isLoading) return;
      
      setIsLoading(true);
      dispatch(actLikeToggle(id))
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    };

    console.log("rendering")
    return (
      <Link to="" className={product}>
        <Button onClick={actLikeToggleHandler} className={wishListButton}>
          {isLoading && <Spinner animation="border" size="sm" variant="primary" />}
          {!isLoading && !isLiked ? <Like /> :<LikeFull />}
        </Button>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)}</h3>
        <p
          style={{
            fontSize: "12px",
            color: "#062D60",
            margin: "0",
            padding: "0",
          }}
        >
          {quantityReachedToMax
            ? "you reach to the limit"
            : "you can add " + currentRemainingQuantity + " item(s)"}
        </p>
        <Button
          onClick={addToCartHandler}
          variant="info"
          style={{ color: "white" }}
          disabled={isBtnDisable || quantityReachedToMax}
        >
          {isBtnDisable ? (
            <>
              <Spinner animation="border" size="sm" /> loading...
            </>
          ) : (
            "Add to cart"
          )}
        </Button>
      </Link>
    );
  }
);

export default Product;
