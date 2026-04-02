import { Component, signal } from '@angular/core';
import { CartAppComponent } from './components/cart-app.component';

@Component({
  selector: 'app-root',
  imports: [CartAppComponent],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('cart-app');
}
