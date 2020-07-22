import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule } from '@thirty/material';
import * as fromRestaurants from '@thirty/core-state';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsOverviewComponent } from './restaurants/components/restaurants-overview/restaurants-overview.component';
import { RestaurantsDetailComponent } from './restaurants/components/restaurants-detail/restaurants-detail.component';
import { RestaurantsListComponent } from './restaurants/components/restaurants-list/restaurants-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    RestaurantsOverviewComponent,
    RestaurantsDetailComponent,
    RestaurantsListComponent,
    FourOhFourComponent,
    RestaurantsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromRestaurants.restaurantsReducer, {}),
    EffectsModule.forRoot([fromRestaurants.RestaurantsEffects]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


