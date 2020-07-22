import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { RestaurantsEffects } from './restaurants.effects';
import * as RestaurantsActions from './restaurants.actions';

describe('RestaurantsEffects', () => {
  let actions: Observable<any>;
  let effects: RestaurantsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        RestaurantsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(RestaurantsEffects);
  });

  describe('loadRestaurants$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RestaurantsActions.loadRestaurants() });

      const expected = hot('-a-|', {
        a: RestaurantsActions.loadRestaurantsSuccess({ restaurants: [] }),
      });

      expect(effects.loadRestaurants$).toBeObservable(expected);
    });
  });
});
