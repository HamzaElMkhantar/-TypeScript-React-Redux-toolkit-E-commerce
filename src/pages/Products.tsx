import { Product } from "@components/ecommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  cleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/common";
import { TProductResponse } from "@customTypes/productsTypes";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Products() {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector(state => state.wishlist.itemsIs)

  const productFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0, 
    isLiked: wishListItemsId.includes(el.id)
  }))
  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string)); // ? casting to string

    return () => {
      dispatch(cleanUp()); // ! cleanup on unmount to prevent memory leaks
    };
  }, [dispatch, prefix]);

  return (
    <div>
      <Heading>Home<KeyboardArrowRightIcon style={{fontSize:'25px', margin:'0', padding:'0'}} />{prefix} Products</Heading>
      <Loading status={loading} error={error}>
        <GridList<TProductResponse>
          records={productFullInfo}
          render={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
}

export default Products;
