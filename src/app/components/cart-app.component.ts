import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from "./navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'
import { ItemsState } from '../store/cart-item/items.reducer';
import { Store } from '@ngrx/store';
import { add, remove, total } from '../store/cart-item/items.actions';
import { selectorItems } from '../store/cart-item/items.selector';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  constructor(
    private store: Store<{items: ItemsState}>,
    private router: Router,
    private sharingDataService: SharingDataService){
      this.store.select(selectorItems).subscribe(state => {
        this.items = state.items;
        this.saveSession();
      });
    }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart(); // Al inicio se suscribe al evento
    this.onAddCart(); // Al inicio se suscribe al evento
  }

  onAddCart(): void{
    this.sharingDataService.productEventEmitter.subscribe(product => {
      this.store.dispatch(add({product}));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);

      Swal.fire({
        title: "Compras",
        text: "Nuevo producto agregado",
        icon: "success"
      });
    })
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "Cuidado el item se eliminara del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart']);
          });

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras.",
            icon: "success"
          });
        }
      });
    })
  }
  
  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
