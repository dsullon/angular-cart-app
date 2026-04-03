import { createFeatureSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

export const productsSelector = createFeatureSelector<ProductState>('products');