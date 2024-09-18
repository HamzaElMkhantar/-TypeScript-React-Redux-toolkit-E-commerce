import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { useAppSelector } from "@store/hooks";
import CartIcon from "@assets/svg/cart.svg?react"
import WishListIcon from "@assets/svg/wishlist.svg?react"
const HeaderRightBar = () => {
  const totalWishListQuantity = useAppSelector(
    (state) => state.wishlist.itemsIs.length
  );
  const totalCartQuantity = useAppSelector(getCartTotalQuantitySelector);

  return (
    <div className="d-flex">
      <HeaderCounter
        totalQuantity={totalCartQuantity}
        svgIcon={<CartIcon />}
        pathLink="cart"
      />
      <HeaderCounter
        totalQuantity={totalWishListQuantity}
        svgIcon={<WishListIcon />}
        pathLink="wishlist"
      />
    </div>
  );
};

export default HeaderRightBar;
