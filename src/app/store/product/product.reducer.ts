import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/product";
import { findAll, load } from "./product.actions";

export interface ProductState {
    products: Product[]
}

const initialState: ProductState = {
    products: []
}

export const productsReducer = createReducer(
    initialState,
    on(load, (state) => ({
        ...state,
        products: [... state.products]})
    ),
    on(findAll, (state, {products}) => ({
        ...state,
        products: [...products]
    }))
)