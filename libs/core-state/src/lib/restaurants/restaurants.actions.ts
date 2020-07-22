import { Restaurant } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedRestaurant = createAction('[Restaurants] Reset Selected Restaurant');
export const resetRestaurants = createAction('[Restaurants] Reset Restaurants');

// Select Restaurant
export const selectRestaurant = createAction(
  '[Restaurants] Select Restaurant',
  props<{ selectedId: string }>()
);

// Load Restaurants
export const loadRestaurants = createAction('[Restaurants] Load Restaurants');

export const loadRestaurantsSuccess = createAction(
  '[Restaurants] Load Restaurants Success',
  props<{ restaurants: Restaurant[] }>()
);

export const loadRestaurantsFailure = createAction(
  '[Restaurants] Load Restaurants Failure',
  props<{ error: any }>()
);

// Load Restaurant
export const loadRestaurant = createAction(
  '[Restaurants] Load Restaurant',
  props<{ restaurantId: string }>()
);

export const loadRestaurantSuccess = createAction(
  '[Restaurants] Load Restaurant Success',
  props<{ restaurant: Restaurant }>()
);

export const loadRestaurantFailure = createAction(
  '[Restaurants] Load Restaurant Failure',
  props<{ error: any }>()
);

// Create Restaurant
export const createRestaurant = createAction(
  '[Restaurants] Create Restaurant',
  props<{ restaurant: Restaurant }>()
);

export const createRestaurantSuccess = createAction(
  '[Restaurants] Create Restaurant Success',
  props<{ restaurant: Restaurant }>()
);

export const createRestaurantFailure = createAction(
  '[Restaurants] Create Restaurant Failure',
  props<{ error: any }>()
);

// Update Restaurant
export const updateRestaurant = createAction(
  '[Restaurants] Update Restaurant',
  props<{ restaurant: Restaurant }>()
);

export const updateRestaurantSuccess = createAction(
  '[Restaurants] Update Restaurant Success',
  props<{ restaurant: Restaurant }>()
);

export const updateRestaurantFailure = createAction(
  '[Restaurants] Update Restaurant Failure',
  props<{ error: any }>()
);

// Delete Restaurant
export const deleteRestaurant = createAction(
  '[Restaurants] Delete Restaurant',
  props<{ restaurant: Restaurant }>()
);

export const deleteRestaurantCancelled = createAction(
  '[Restaurants] Delete Restaurant Cancelled'
);

export const deleteRestaurantSuccess = createAction(
  '[Restaurants] Delete Restaurant Success',
  props<{ restaurant: Restaurant }>()
);

export const deleteRestaurantFailure = createAction(
  '[Restaurants] Delete Restaurant Failure',
  props<{ error: any }>()
);