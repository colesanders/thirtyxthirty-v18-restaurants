import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '@thirty/api-interfaces';
import { RestaurantsFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'thirty-restaurants-overview',
  templateUrl: './restaurants-overview.component.html',
  styleUrls: ['./restaurants-overview.component.scss']
})
export class RestaurantsOverviewComponent implements OnInit, OnChanges {
  restaurant$: Observable<Restaurant> = this.restaurantFacade.selectedRestaurant$;


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private restaurantFacade: RestaurantsFacade
  ) { }

  ngOnInit(): void {
    this.get();
    this.restaurantFacade.mutations$.subscribe((action: any) => this.get());

  }

  ngOnChanges(): void{
    this.get();
  }


  get(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restaurantFacade.selectRestaurant(id);
  }

  close(){
    this.restaurantFacade.resetSelectedRestaurant();
    this.router.navigate(['/restaurants']);
  }
}
