import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
  @Input() restaurants: [Restaurant];
  @Output() selected = new EventEmitter<Restaurant>();
  @Output() deleted = new EventEmitter<Restaurant>();
  constructor() { }

  ngOnInit(): void {
  }

}
