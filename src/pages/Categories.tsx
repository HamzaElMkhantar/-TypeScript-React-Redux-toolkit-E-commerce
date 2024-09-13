import { Category } from "@components/ecommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/common";
import { TCategoryResponse } from "@customTypes/categoriesTypes";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
function Categories() {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);


  return (
    <div>
      <Heading>Home<KeyboardArrowRightIcon style={{fontSize:'25px', margin:'0', padding:'0'}} />Categories</Heading>
      <Loading status={loading} error={error}>
        <GridList<TCategoryResponse>
          records={records}
          render={(record) => <Category {...record} />}
        />
      </Loading>
    </div>
  );
}

export default Categories;
