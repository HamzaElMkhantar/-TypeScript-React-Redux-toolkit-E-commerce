import { Category } from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/common";
import { TCategoryResponse } from "@customTypes/categoriesTypes";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useCategories from "@hooks/useCategories";
function Categories() {
  const { loading, error, records } = useCategories();

  return (
    <div>
      <Heading>
        Home
        <KeyboardArrowRightIcon
          style={{ fontSize: "25px", margin: "0", padding: "0" }}
        />
        Categories
      </Heading>
      <Loading status={loading} error={error} type="category">
        <GridList<TCategoryResponse>
          emptyMessage="there are no categories available"
          records={records}
          render={(record) => <Category {...record} />}
        />
      </Loading>
    </div>
  );
}

export default Categories;
