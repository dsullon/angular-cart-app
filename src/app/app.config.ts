import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/cart-item/items.reducer';
import { productsReducer } from './store/product/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/product/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      items: itemsReducer,
      products: productsReducer,
    }),
    provideEffects(ProductEffects),
  ],
};
