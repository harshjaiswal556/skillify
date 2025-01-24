import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  protected url = 'http://localhost:3000/users';

  constructor(private http : HttpClient) { }

  createUser(item: any): Observable<any> {
    return this.http.get<any[]>(`${this.url}?email=${item.email}`).pipe(
      map(users => {
        if (users.length === 0) {
          return this.http.post<any>(this.url, item);
          
        } else {
          alert("Email already exists");
          throw new Error("Email already exists");
        }
      }),
      switchMap(result => result)
    );
  }
}
