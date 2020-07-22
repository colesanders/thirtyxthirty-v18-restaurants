import { Restaurant } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as RestaurantsActions from './restaurants.actions';

export const RESTAURANTS_FEATURE_KEY = 'restaurant';

export interface RestaurantsState extends EntityState<Restaurant> {
  selectedId?: string | number; // which Restaurants record has been selected
  loaded: boolean; // has the Restaurants list been loaded
  error?: string | null; // last known error (if any)
}

export interface RestaurantsPartialState {
  readonly [RESTAURANTS_FEATURE_KEY]: RestaurantsState;
}

export const restaurantAdapter: EntityAdapter<Restaurant> = createEntityAdapter();

export const initialRestaurantsState: RestaurantsState = restaurantAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _restaurantsReducer = createReducer(
  initialRestaurantsState,
  on(RestaurantsActions.resetRestaurants, state => restaurantAdapter.removeAll(state)),
  on(RestaurantsActions.resetSelectedRestaurant, state => Object.assign({}, state, { selectedId: null })),
  on(RestaurantsActions.selectRestaurant, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load restaurants
  on(
    RestaurantsActions.loadRestaurantsSuccess,
    (state, { restaurants }) =>
    restaurantAdapter.setAll(restaurants, { ...state, loaded: true })
  ),
  // Load restaurant
  on(
    RestaurantsActions.loadRestaurantSuccess,
    (state, { restaurant }) =>
    restaurantAdapter.upsertOne(restaurant, { ...state, loaded: true })
  ),
  // Add restaurant
  on(RestaurantsActions.createRestaurantSuccess,
    (state, { restaurant }) =>
    restaurantAdapter.addOne(restaurant, state)
  ),
  // Update restaurant
  on(RestaurantsActions.updateRestaurantSuccess,
    (state, { restaurant }) =>
    restaurantAdapter.updateOne({ id: restaurant.id, changes: restaurant }, state)
  ),
  // Delete restaurant
  on(RestaurantsActions.deleteRestaurantSuccess,
    (state, { restaurant }) =>
    restaurantAdapter.removeOne(restaurant.id, state)
  ),

  // failure actions
  on(
    RestaurantsActions.deleteRestaurantFailure,
    RestaurantsActions.updateRestaurantFailure,
    RestaurantsActions.createRestaurantFailure,
    RestaurantsActions.loadRestaurantFailure,
    RestaurantsActions.loadRestaurantsFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    RestaurantsActions.loadRestaurant,
    RestaurantsActions.loadRestaurants,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function restaurantsReducer(state: RestaurantsState | undefined, action: Action) {
  return _restaurantsReducer(state, action);
}