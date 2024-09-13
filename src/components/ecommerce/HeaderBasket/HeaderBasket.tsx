import { useAppSelector } from "@store/hooks";
import Logo from "../../../assets/svg/cart.svg?react";
import styles from "./styles.module.css";
import { getCartTotalQuantitySelector } from "@store/cart/selectors/cartSelectors";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { container, totalNum, pumpAnimate } = styles;

const HeaderBasket = () => {
  const [animated, setAnimated] = useState<boolean>(false);
  const totalItems = useAppSelector(getCartTotalQuantitySelector);
  const quantityStyle = `${totalNum} ${animated ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalItems) return;
    setAnimated(true);

    const debounce = setTimeout(() => {
      setAnimated(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalItems]);
  return (
    <div>
      <Link to="/cart" className={container}>
        <Logo title="basket icon" />
        {totalItems > 0  && <div className={quantityStyle}>{totalItems}</div>}
      </Link>
      Cart
    </div>
  );
};

export default HeaderBasket;
