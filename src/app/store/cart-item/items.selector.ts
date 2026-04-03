import { createFeatureSelector } from "@ngrx/store";
import { ItemsState } from "./items.reducer";

export const selectorItems = createFeatureSelector<ItemsState>('items');