import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  productsFullInfoCleanUp,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
import { TProductResponse } from "@customTypes/productsTypes";
import Loading from "@components/feedback/Loading/Loading";

const WishList = () => {
  const { error, loading, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(productsFullInfoCleanUp());
    };
  }, [dispatch]);
  const productFullInfo = productsFullInfo.map((el) => ({
    ...el,
    isLiked: true,
  }));

  return (
    <div>
      <Heading>
        Home
        <KeyboardArrowRightIcon
          style={{ fontSize: "25px", margin: "0", padding: "0" }}
        />{" "}
        WishList
      </Heading>
      <Loading status={loading} error={error}>
        <GridList<TProductResponse>
          records={productFullInfo}
          render={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
};

export default WishList;
