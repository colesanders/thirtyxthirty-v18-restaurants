import { RestaurantsEntity } from './restaurants.models';
import { State, restaurantsAdapter, initialState } from './restaurants.reducer';
import * as RestaurantsSelectors from './restaurants.selectors';

describe('Restaurants Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRestaurantsId = (it) => it['id'];
  const createRestaurantsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RestaurantsEntity);

  let state;

  beforeEach(() => {
    state = {
      restaurants: restaurantsAdapter.addAll(
        [
          createRestaurantsEntity('PRODUCT-AAA'),
          createRestaurantsEntity('PRODUCT-BBB'),
          createRestaurantsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Restaurants Selectors', () => {
    it('getAllRestaurants() should return the list of Restaurants', () => {
      const results = RestaurantsSelectors.getAllRestaurants(state);
      const selId = getRestaurantsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RestaurantsSelectors.getSelected(state);
      const selId = getRestaurantsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getRestaurantsLoaded() should return the current 'loaded' status", () => {
      const result = RestaurantsSelectors.getRestaurantsLoaded(state);

      expect(result).toBe(true);
    });

    it("getRestaurantsError() should return the current 'error' state", () => {
      const result = RestaurantsSelectors.getRestaurantsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
