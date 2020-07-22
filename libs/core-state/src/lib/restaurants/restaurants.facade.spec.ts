import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { RestaurantsEntity } from './restaurants.models';
import { RestaurantsEffects } from './restaurants.effects';
import { RestaurantsFacade } from './restaurants.facade';

import * as RestaurantsSelectors from './restaurants.selectors';
import * as RestaurantsActions from './restaurants.actions';
import {
  RESTAURANTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './restaurants.reducer';

interface TestSchema {
  restaurants: State;
}

describe('RestaurantsFacade', () => {
  let facade: RestaurantsFacade;
  let store: Store<TestSchema>;
  const createRestaurantsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RestaurantsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(RESTAURANTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([RestaurantsEffects]),
        ],
        providers: [RestaurantsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(RestaurantsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allRestaurants$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(RestaurantsActions.loadRestaurants());

        list = await readFirst(facade.allRestaurants$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadRestaurantsSuccess` to manually update list
     */
    it('allRestaurants$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allRestaurants$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          RestaurantsActions.loadRestaurantsSuccess({
            restaurants: [
              createRestaurantsEntity('AAA'),
              createRestaurantsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allRestaurants$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
