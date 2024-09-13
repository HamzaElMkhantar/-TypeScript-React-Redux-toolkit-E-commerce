import { TProductResponse } from "./productsTypes";
import { ELoadingState } from "./shared";

export interface IWishlistResponse {
    user: number;
    items: number;
    id: number;
}

export interface IWishlistState {
    itemsIs: number[],
    productsFullInfo: TProductResponse[]
    loading: ELoadingState,
    error: string | null,
}