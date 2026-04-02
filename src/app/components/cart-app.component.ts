import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from "./catalog/catalog.component";
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from "./navbar/navbar.component";
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private service: ProductService){}
  ngOnInit(): void {
    this.products = this.service.finAll();
    const data = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.items = data.map(
      (item: any) => new CartItem(item.quantity, item.product)
    );
  }

  onAddCart(product: Product): void{
    const hasItem = this.items.find(item => item.product.id === product.id);
    if(hasItem){
      this.items = this.items.map(item => {
        if(item.product.id === product.id){
          return new CartItem(item.quantity + 1, item.product);
        } else {
          return item;
        }
      });
    } else {
      const instance = new CartItem(1, product);
      this.items = [...this.items, instance];
    }
  }

  onDeleteCart(id: number): void{
    this.items = this.items.filter(item => item.product.id !== id);
    if(this.items.length == 0)
      sessionStorage.removeItem('cart');
  }

  openCloseCart(): void{
    this.showCart = !this.showCart;
  }
}
