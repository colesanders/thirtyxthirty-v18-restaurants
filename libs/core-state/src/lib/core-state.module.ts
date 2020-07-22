import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRestaurants from './restaurants/restaurants.reducer';
import { RestaurantsEffects } from './restaurants/restaurants.effects';
import { RestaurantsFacade } from './restaurants/restaurants.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromRestaurants.RESTAURANTS_FEATURE_KEY,
      fromRestaurants.restaurantsReducer
    ),
    EffectsModule.forFeature([RestaurantsEffects]),
  ],
  providers: [RestaurantsFacade],
})
export class CoreStateModule {}
