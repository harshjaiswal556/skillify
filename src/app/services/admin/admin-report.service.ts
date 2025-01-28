import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {
  protected url = 'http://localhost:3000/users'

  constructor(private http : HttpClient) { }

  getData(id : string): Observable<any>{
    return this.http.get(`${this.url}?id=${id}`).pipe(map(res=>res));
  }

  deleteUserById(userId : string):Observable<any>{
    return this.http.delete(this.url+"/"+userId)
  }
  
}
