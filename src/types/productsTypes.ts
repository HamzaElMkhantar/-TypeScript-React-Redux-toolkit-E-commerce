import { ELoadingState } from "./shared";

export interface IGetProductsProps {
    title: string;
    price: number;
    cat_prefix?: string;
    img: string;
    quantity?: number,
    max?: number | undefined;
    isLiked?: boolean;
}

export type TProductResponse = IGetProductsProps & {
    id: number;
};

export interface IProductsState {
    records: TProductResponse[];
    loading: ELoadingState;
    error: string | null;
}