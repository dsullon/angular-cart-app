import { createFeatureSelector, createReducer, on } from "@ngrx/store";
import { CartItem } from "../../models/cartItem";
import { add, remove, total } from "./items.actions";

export interface ItemsState {
    items: CartItem[],
    total: number;
}

export const initialState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total: 0
}
export const itemsReducer = createReducer(
    initialState,
    on(add, (state, {product}) => {
        const hasItem = state.items.find((item: CartItem) => item.product.id === product.id);
        if(hasItem){
            return {
                items: state.items.map((item: CartItem) => {
                    if(item.product.id === product.id)
                        return new CartItem(item.quantity + 1, item.product);
                    return item;
                }), 
                total: state.total};
        } else {
            const instance = new CartItem(1, product);
            return {
                items: [...state.items, instance],
                total: state.total
            };
        }
    }),
    on(remove, (state, {id}) => {
        return {
            items: state.items.filter(item => item.product.id !== id),
            total: state.total
        }
    }),
    on(total, state => {
        return {
            items: state.items,
            total: state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
        }
    })
)