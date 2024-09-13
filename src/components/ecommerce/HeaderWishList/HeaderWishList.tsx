import { useAppSelector } from "@store/hooks";
import Logo from "../../../assets/svg/wishlist.svg?react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { container, totalNum, pumpAnimate } = styles;

const HeaderWishList = () => {
  const [animated, setAnimated] = useState<boolean>(false);
  const totalItems = useAppSelector(state => state.wishlist.itemsIs.length);
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
    <div className="mx-4">
      <Link to="/wishlist" className={container}>
        <Logo title="basket icon" />
        {totalItems > 0 && <div className={quantityStyle}>{totalItems}</div>}
      </Link>
      WishList
    </div>
  );
};

export default HeaderWishList;
