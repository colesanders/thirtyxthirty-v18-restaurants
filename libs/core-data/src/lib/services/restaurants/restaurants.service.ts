import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/restaurants';


@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Restaurant]>{
    return this.http.get<[Restaurant]>(BASE_URL);
  }

  byId(id): Observable<Restaurant>{
    return this.http.get<Restaurant>(this.getUrl(id));
  }

  create(restaurant: Restaurant): Observable<Restaurant>{
    return this.http.post<Restaurant>(BASE_URL, restaurant);
  }

  update(restaurant: Restaurant): Observable<Restaurant>{
    return this.http.put<Restaurant>(this.getUrl(restaurant.id), restaurant);
  }

  delete(id): Observable<Restaurant>{
    return this.http.delete<Restaurant>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
