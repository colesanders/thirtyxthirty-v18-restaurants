import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantsComponent } from './restaurants/restaurants.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { RestaurantsOverviewComponent } from './restaurants/components/restaurants-overview/restaurants-overview.component';

import { LoginGuard } from '@thirty/ui-login';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantsComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', // child route path
        component: RestaurantsOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/restaurants', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiLoginModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
