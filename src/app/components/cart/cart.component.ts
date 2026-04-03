import { Component } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/cart-item/items.reducer';
import { selectorItems } from '../../store/cart-item/items.selector';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent{

  items: CartItem[] = [];
  total: number = 0;  

  constructor(
    private store: Store<{items: ItemsState}>,
    private sharingDataService: SharingDataService){
      this.store.select(selectorItems).subscribe(state => {
        this.items = state.items;
        this.total = state.total;
      });
  }

  onDeleteCart(id: number){
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
