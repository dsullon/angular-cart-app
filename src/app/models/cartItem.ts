import { Product } from "./product";

export class CartItem{
    constructor(
        public quantity: number,
        public product: Product,
    ){}
}