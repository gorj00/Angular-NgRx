import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

// Reducer functions is triggered whenever an action is dispatched

// Two arguments that are passed automatically:
   // state (current or initial state)
   // action

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

// REDUCER
export function shoppingListReducer(state = initialState,
    action: ShoppingListActions.ShoppingListActions) {
  // Inside reducer, you have to return new state

  // Which one based on action
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
              };
    default:
      return state;
  }

}
