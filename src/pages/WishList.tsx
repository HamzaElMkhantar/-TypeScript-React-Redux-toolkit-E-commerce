import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { TProductResponse } from "@customTypes/productsTypes";
import Loading from "@components/feedback/Loading/Loading";
import useWishList from "@hooks/useWishList";

const WishList = () => {
  const { error, loading, productFullInfo } = useWishList();

  return (
    <div>
      <Heading>
        Home
        <KeyboardArrowRightIcon
          style={{ fontSize: "25px", margin: "0", padding: "0" }}
        />{" "}
        WishList
      </Heading>
      <Loading status={loading} error={error} type="category">
        <GridList<TProductResponse>
          emptyMessage="there is no wish list available"
          records={productFullInfo}
          render={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
};

export default WishList;
