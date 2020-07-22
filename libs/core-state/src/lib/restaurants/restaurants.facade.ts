import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Restaurant } from '@thirty/api-interfaces';

import * as RestaurantsActions from './restaurants.actions';
import * as fromRestaurants from './restaurants.reducer';
import * as RestaurantsSelectors from './restaurants.selectors';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsFacade {
  loaded$ = this.store.pipe(select(RestaurantsSelectors.getRestaurantsLoaded));
  allRestaurants$ = this.store.pipe(select(RestaurantsSelectors.getAllRestaurants));
  selectedRestaurant$ = this.store.pipe(select(RestaurantsSelectors.getSelectedRestaurant));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === RestaurantsActions.createRestaurant({} as any).type ||
    action.type === RestaurantsActions.updateRestaurant({} as any).type ||
    action.type === RestaurantsActions.deleteRestaurant({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectRestaurant(selectedId: string) {
    this.dispatch(RestaurantsActions.selectRestaurant({ selectedId }));
  }

  resetSelectedRestaurant(){
    this.dispatch(RestaurantsActions.resetSelectedRestaurant());
  }

  loadRestaurants() {
    this.dispatch(RestaurantsActions.loadRestaurants());
  }

  loadRestaurant(restaurantId: string) {
    this.dispatch(RestaurantsActions.loadRestaurant({ restaurantId }));
  }

  createRestaurant(restaurant: Restaurant) {
    this.dispatch(RestaurantsActions.createRestaurant({ restaurant }));
  }

  updateRestaurant(restaurant: Restaurant) {
    this.dispatch(RestaurantsActions.updateRestaurant({ restaurant }));
  }

  deleteRestaurant(restaurant: Restaurant) {
    this.dispatch(RestaurantsActions.deleteRestaurant({ restaurant }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
