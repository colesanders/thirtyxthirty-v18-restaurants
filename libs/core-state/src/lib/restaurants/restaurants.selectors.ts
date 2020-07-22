import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RESTAURANTS_FEATURE_KEY,
  RestaurantsState,
  RestaurantsPartialState,
  restaurantAdapter
} from './restaurants.reducer';

// Lookup the 'Restaurants' feature state managed by NgRx
export const getRestaurantsState = createFeatureSelector<
  RestaurantsPartialState,
  RestaurantsState
>(RESTAURANTS_FEATURE_KEY);

const { selectAll, selectEntities } = restaurantAdapter.getSelectors();

export const getRestaurantsLoaded = createSelector(
  getRestaurantsState,
  (state: RestaurantsState) => state.loaded
);

export const getRestaurantsError = createSelector(
  getRestaurantsState,
  (state: RestaurantsState) => state.error
);

export const getAllRestaurants = createSelector(
  getRestaurantsState,
  (state: RestaurantsState) => selectAll(state)
);

export const getRestaurantsEntities = createSelector(
  getRestaurantsState,
  (state: RestaurantsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getRestaurantsState,
  (state: RestaurantsState) => state.selectedId
);

export const getSelectedRestaurant = createSelector(
  getRestaurantsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);