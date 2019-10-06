# 1.   DEFINE A NEW ACTION - action.ts

## 1.1. Create a constant with an action name

```typescript
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
```


## 1.2. Create a class of the action name, use the action as the type
```typescript
export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}
```

## 1.3. Export is as an actions bundle
```typescript
export type ShoppingListActions = AddIngredient | AddIngredientS;
```


# 2.   DEFINE THE ACTION IN THE REDUCER - reducer.ts

## 2.1. Already defined initial state
```typescript
// all imports

const initialState = {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Potatoes', 3)
    ]
};
```

## 2.2. Define the case of state for the action
```typescript
export function ShoppingListReducer(state = initialState,
                  action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {

      case ShoppingListActions.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };

      case ShoppingListActions.ADD_INGREDIENTS:
          return {
            // get current state
            ...state,
            // change the current state's property ingredients
            // [load current ingredients, add new ones]
            ingredients: [...state.ingredients, ...action.payload]
          };

      default:
          return state;

    }
}
```

# 3. DISPATCH THE ACTION - component.ts/service.ts

## 3.1. Import actions

```typescript
import * as ShoppingListActions from 'path/shopping-list.actions';
```

## 3.2. When you want to dispatch an action, have the Redux store injected

```typescript
import * as ShoppingListActions from 'path/shopping-list.actions';
import { Ingredient } from 'path/ingredient.model.ts';

import { Store } from '@ngrx/store';

@Injectable() 
export class RecipeService {
  // service logic

  constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}

  // service logic
}
```

## 3.3. Dispatch the action where it needs to be
```typescript
import * as ShoppingListActions from 'path/shopping-list.actions';
import { Ingredient } from 'path/ingredient.model.ts';

import { Store } from '@ngrx/store';

@Injectable() 
export class RecipeService {
  // service logic

  constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}

  // service logic

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }
}
```


# 4. CREATE EFFECTS - effects.ts
Side effects are used mainly for asynchrnous effects that **don't change the state** but are needed for an action (fetching data, for example).

- run command: `npm instal --save @ngrx/effects`

## 4.1. Register EffectsModule in AppModule
```typescript
// *.module.ts

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'path/auth.effects';

// ...module logic
imports: [
  // ...other imports
  EffectsModule.forRoot([AuthEffects])
]
// module logic...
```

## 4.2. Create Effects file
```typescript
// AuthEffects file

import { Acions, tEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as AuthActions from 'path/auth.actions';

@Injectable()
export class AuthEffects {

  // If NOT dispatching any other action at the end of the effect to change the state
  // @Effect({dispatch: false})

  @Effect()
  authSignup = this.actions
    // will fire only if the action is of the following type
    ofType(AuthActions.TRY_SIGNUP)
    pipe(
      map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      // will get whatever map returns
      switchMap((authData: {username: string, password: string}) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getToken());
      }),
      // returns observable
      mergeMap((token: string) => {
        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ]
      })

    ); 

  constructor(private actions: Actions) {}
}
```

