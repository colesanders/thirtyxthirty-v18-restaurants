import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { RestaurantsOverviewComponent } from './restaurants-overview.component';
import { RestaurantsFacade, selectRestaurant } from '@thirty/core-state';

const mockRestaurantsFacade = {
  loadRestaurants: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectRestaurant: (id:string) => {}
}

describe('RestaurantsOverviewComponent', () => {
  let component: RestaurantsOverviewComponent;
  let fixture: ComponentFixture<RestaurantsOverviewComponent>;
  let de: DebugElement;
  let restaurantFacade: RestaurantsFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsOverviewComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: RestaurantsFacade, useValue: mockRestaurantsFacade }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    restaurantFacade = de.injector.get(RestaurantsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call facade.select', () => {
  //   component.get()
  //   expect(restaurantFacade.selectRestaurant).toBeCalled();
  // });

});
