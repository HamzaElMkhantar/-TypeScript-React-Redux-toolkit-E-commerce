import { TProductResponse } from "./productsTypes";
import { ELoadingState } from "./shared";

export interface ICartResponse {
 id: number;
 title: string;   
 quantity: number;
 price: number;
 img: string;
}

export interface ICartState {
 items: {[key: string]: number}; // index signature ({1:1, 2:4})
 productFullInfo: TProductResponse[],
 loading: ELoadingState;
 error: string | null;
}