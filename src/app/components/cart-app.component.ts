import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from "./navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService){}

  ngOnInit(): void {
    const data = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.items = data.map(
      (item: any) => new CartItem(item.quantity, item.product)
    );
    this.calculateTotal();
    this.onDeleteCart(); // Al inicio se suscribe al evento
    this.onAddCart(); // Al inicio se suscribe al evento
  }

  onAddCart(): void{
    this.sharingDataService.productEventEmitter.subscribe(product => {
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
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], 
        {state: {items: this.items, total: this.total}}
      );

      Swal.fire({
        title: "Compras",
        text: "Nuevo producto agregado",
        icon: "success"
      });
    })
  }

  onDeleteCart(): void{
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      Swal.fire({
        title: "¿Seguro de quitar el producto?",
        text: "El proceso es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
      }).then((result) => {
        if (result.isConfirmed){
          this.items = this.items.filter(item => item.product.id !== id);
          if(this.items.length == 0)
            sessionStorage.removeItem('cart');
      
          this.calculateTotal();
          this.saveSession();
          this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'], 
              {state: {items: this.items, total: this.total}}
            );
          });

          Swal.fire({
            title: "Producto eliminado!",
            text: "El producto ha sido eliminado del carrito de compras.",
            icon: "success"
          });
        }
      });
    });
  }

  calculateTotal(): void{
    this.total = this.items.reduce((total, item) => total + item.total(), 0);
  }
  
  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
