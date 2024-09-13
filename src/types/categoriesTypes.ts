import { ELoadingState } from "./shared";

export interface ICategoryProps {
    title: string;
    prefix: string;
    img: string;
}

export type TCategoryResponse = ICategoryProps & {
  id: number;
 };

export interface ICategoriesState {
  records: TCategoryResponse[];
  loading: ELoadingState;
  error: string | null;
}

