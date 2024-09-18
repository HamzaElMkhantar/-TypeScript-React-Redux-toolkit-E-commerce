import { Product } from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/common";
import { TProductResponse } from "@customTypes/productsTypes";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useProducts from "@hooks/useProducts";

function Products() {
  const { loading, error, productFullInfo, prefix } = useProducts();

  return (
    <div>
      <Heading title={prefix}>
        Home
        <KeyboardArrowRightIcon
          style={{ fontSize: "25px", margin: "0", padding: "0" }}
        />{" "}
        Products
      </Heading>
      <Loading status={loading} error={error} type="product">
        <GridList<TProductResponse>
          emptyMessage="there are no products available"
          records={productFullInfo}
          render={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
}

export default Products;
