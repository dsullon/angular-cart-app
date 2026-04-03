import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";

export const load = createAction('[Products] Load Products');
export const findAll = createAction('[Products] Find All Products', props<{products: Product[]}>());
