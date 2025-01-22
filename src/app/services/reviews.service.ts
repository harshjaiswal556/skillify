import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  protected url = 'http://localhost:3000/reviews';

  getReviews(): Observable<any>{
    return this.http.get(this.url).pipe(map(res => res));
  }
}
