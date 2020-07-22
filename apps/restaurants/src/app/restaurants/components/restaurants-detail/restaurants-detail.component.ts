import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Restaurant } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-restaurants-detail',
  templateUrl: './restaurants-detail.component.html',
  styleUrls: ['./restaurants-detail.component.scss']
})
export class RestaurantsDetailComponent implements OnInit, OnChanges{
  @Input() restaurant: Restaurant;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  restaurantForm: FormGroup;

  serviceTypes = [
    {value: 'fast-food', display: 'Fast-Food'},
    {value: 'dine-in', display: 'Dine-In'},
    {value: 'delivery', display: 'Delivery'},
    {value: 'digiorno', display: 'Digiorno'}
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.restaurantForm && this.restaurant){
      this.restaurantForm.patchValue(this.restaurant)
    } else if(this.restaurantForm){
      this.cancel();
    }
  }

  cancel(){
    this.restaurantForm.reset();
    this.restaurantForm.value.weight = 0;
  }

  createFormGroup(){
    this.restaurantForm = this.formBuilder.group({
      id: [],
      name: new FormControl('', [
        Validators.required,
      ]),
      foodType: new FormControl('', [
        Validators.required,
      ]),
      serviceType: new FormControl('', [
      ]),
      price: new FormControl('', [
        Validators.required,
      ]),
      quality: new FormControl('', [
        Validators.required,
      ])
    })
  }
}
