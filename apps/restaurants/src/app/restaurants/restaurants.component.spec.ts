import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { RestaurantsComponent } from './restaurants.component';
import { RestaurantsDetailComponent } from './components/restaurants-detail/restaurants-detail.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { RestaurantsFacade } from '@thirty/core-state';
import { Restaurant } from '@thirty/api-interfaces';

const mockRestaurantsFacade = {
  loadRestaurants: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectRestaurant: (id:string) =>  {
    selectedRestaurant.id = id;
  }
}

const selectedRestaurant: Restaurant = {
  id: '',
  name: '',
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockRestaurant: Restaurant = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('RestaurantsComponent', () => {
  let component: RestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsComponent>;
  let de: DebugElement;
  let restaurantFacade: RestaurantsFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: RestaurantsFacade, useValue: mockRestaurantsFacade }
      ],
      declarations: [ 
        RestaurantsComponent,
        RestaurantsListComponent,
        RestaurantsDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    restaurantFacade = de.injector.get(RestaurantsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockRestaurant);
    expect(selectedRestaurant).toMatchObject(mockRestaurant);
  });


  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

});
