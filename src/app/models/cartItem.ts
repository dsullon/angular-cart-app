import { Product } from "./product";

export class CartItem{
    constructor(
        public quantity: number,
        public product: Product,
    ){}

    total(): number{
        return this.product.price * this.quantity;
    }
}