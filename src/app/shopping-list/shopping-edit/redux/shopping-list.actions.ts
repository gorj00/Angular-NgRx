import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  // forced to provide
  readonly type = ADD_INGREDIENT;

  // optionally, additional data to pass
  payload: Ingredient;
}

export type ShoppingListActions = AddIngredient;

