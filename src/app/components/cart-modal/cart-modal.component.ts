import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent {
  @Input() items: CartItem[] = [];

  @Output() closeEventEmitter = new EventEmitter();
  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  closeCart(): void{
    this.closeEventEmitter.emit();
  }

  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }
}
