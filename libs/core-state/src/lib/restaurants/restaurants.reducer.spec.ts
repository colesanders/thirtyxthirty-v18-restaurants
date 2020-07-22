import { RestaurantsEntity } from './restaurants.models';
import * as RestaurantsActions from './restaurants.actions';
import { State, initialState, reducer } from './restaurants.reducer';

describe('Restaurants Reducer', () => {
  const createRestaurantsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RestaurantsEntity);

  beforeEach(() => {});

  describe('valid Restaurants actions', () => {
    it('loadRestaurantsSuccess should return set the list of known Restaurants', () => {
      const restaurants = [
        createRestaurantsEntity('PRODUCT-AAA'),
        createRestaurantsEntity('PRODUCT-zzz'),
      ];
      const action = RestaurantsActions.loadRestaurantsSuccess({ restaurants });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
