import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges{

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSession();
  }
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }
  
  calculateTotal(): void{
    this.total = this.items.reduce((total, item) => total + item.total(), 0);
  }
  
  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
