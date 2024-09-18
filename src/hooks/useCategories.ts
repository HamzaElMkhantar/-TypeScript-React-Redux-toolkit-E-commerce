import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );
  useEffect(() => {
   const promise = dispatch(actGetCategories());
    // if (!records.length) {
    // }
    return () => {
      promise.abort(); // ?`createAsyncThunk` attaches an `abort()` method to the promise 
    }
  }, [dispatch]);
  return { loading, error, records };
};

export default useCategories;
