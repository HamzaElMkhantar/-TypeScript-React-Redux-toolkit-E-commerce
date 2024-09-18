import { ELoadingState } from "@customTypes/shared";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

interface ILoading {
  status: ELoadingState;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
}
function Loading({ status, error, children, type = "category" }: ILoading) {
  const Component = skeletonTypes[type];

  if (status === ELoadingState.Pending) {
    return <Component />;
  }
  if (error === ELoadingState.Failed) {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }
  return <>{children}</>;
}

export default Loading;
