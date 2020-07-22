import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { RestaurantsFacade } from '@thirty/core-state'
import { Restaurant } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/core-data';
import { Animations } from './animations';


@Component({
  selector: 'thirty-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  animations: Animations,
})
export class RestaurantsComponent implements OnInit {
  restaurants$: Observable<Restaurant[]> = this.restaurantFacade.allRestaurants$;
  restaurant$: Observable<Restaurant> = this.restaurantFacade.selectedRestaurant$;
  detailOpen = false;

  constructor(
    private restaurantFacade: RestaurantsFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.restaurantFacade.loadRestaurants();
    this.restaurantFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Restaurant ' + trigger[1] + 'd';
    this.focusoutDetail();
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.restaurantFacade.resetSelectedRestaurant();
    this.restaurantFacade.loadRestaurants();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(restaurant: Restaurant): void{
    this.restaurantFacade.selectRestaurant(restaurant.id);
    this.focusDetail();
  }

  delete(restaurant: Restaurant): void{
    this.restaurantFacade.deleteRestaurant(restaurant);
  }

  save(restaurant: Restaurant): void{
    if(restaurant.id !== null){
      this.restaurantFacade.updateRestaurant(restaurant);
    }else {
      this.restaurantFacade.createRestaurant(restaurant);
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/restaurants']);
    this.restaurantFacade.resetSelectedRestaurant();
  }

}
