import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";

export const add = createAction('[Cart Items] Add', props<{product: Product}>())
export const remove = createAction('[Cart Items] Remove', props<{id: number}>())
export const total = createAction('[Cart Items] Calculate Total')