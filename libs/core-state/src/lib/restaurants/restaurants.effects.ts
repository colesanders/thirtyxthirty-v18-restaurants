import { Injectable } from '@angular/core';
import { RestaurantsService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as RestaurantsActions from './restaurants.actions';
import { Restaurant } from '@thirty/api-interfaces';

@Injectable()
export class RestaurantsEffects {
  @Effect() loadRestaurants$ = this.actions$.pipe(
    ofType(RestaurantsActions.loadRestaurants),
    fetch({
      run: (action) => this.restaurantsService.all().pipe(
        map((restaurants: Restaurant[]) => RestaurantsActions.loadRestaurantsSuccess({ restaurants }))
      ),
      onError: (action, error) => RestaurantsActions.loadRestaurantsFailure({ error })
    })
  );

  @Effect() loadRestaurant$ = this.actions$.pipe(
    ofType(RestaurantsActions.loadRestaurant),
    fetch({
      run: (action) => this.restaurantsService.byId(action.restaurantId).pipe(
        map((restaurant: Restaurant) => RestaurantsActions.loadRestaurantSuccess({ restaurant }))
      ),
      onError: (action, error) => RestaurantsActions.loadRestaurantFailure({ error })
    })
  );

  @Effect() createRestaurant$ = this.actions$.pipe(
    ofType(RestaurantsActions.createRestaurant),
    pessimisticUpdate({
      run: (action) => this.restaurantsService.create(action.restaurant).pipe(
        map((restaurant: Restaurant) => RestaurantsActions.createRestaurantSuccess({ restaurant }))
      ),
      onError: (action, error) => RestaurantsActions.createRestaurantFailure({ error })
    })
  );

  @Effect() updateRestaurant$ = this.actions$.pipe(
    ofType(RestaurantsActions.updateRestaurant),
    pessimisticUpdate({
      run: (action) => this.restaurantsService.update(action.restaurant).pipe(
        map((restaurant: Restaurant) => 
          RestaurantsActions.updateRestaurantSuccess({ restaurant }))
      ),
      onError: (action, error) => RestaurantsActions.updateRestaurantFailure({ error })
    })
  );

  @Effect() deleteRestaurant$ = this.actions$.pipe(
    ofType(RestaurantsActions.deleteRestaurant),
    pessimisticUpdate({
      run: (action) => this.restaurantsService.delete(action.restaurant.id).pipe(
        map((restaurant: Restaurant) => RestaurantsActions.deleteRestaurantSuccess({ restaurant })),
      ),
      onError: (action, error) => RestaurantsActions.deleteRestaurantFailure({ error })
    })
  );

  // Effect to refresh the restaurant after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(RestaurantsActions.deleteRestaurantSuccess, RestaurantsActions.updateRestaurantSuccess),
  //   tap(action => {
  //     RestaurantsActions.loadRestaurants();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private restaurantsService: RestaurantsService
  ) {}
}