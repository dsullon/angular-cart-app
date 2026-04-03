import { Injectable, inject } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { findAll, load } from "./product.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class ProductEffects{
    private actions$ = inject(Actions);
    private service = inject(ProductService)

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(load),
            exhaustMap(() => this.service.findAll()),
            map(products => findAll({ products })),
            catchError(() => EMPTY)
        )
    );
    
}