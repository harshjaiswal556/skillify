import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentReportService {

  protected url = 'http://localhost:3000/users'

  constructor(private http : HttpClient) { }

  getData(id : string): Observable<any>{
    return this.http.get(`${this.url}?id=${id}`).pipe(map(res=>res))
  }

  getAllStudent(): Observable<any>{
    return this.http.get(`${this.url}?role=student`).pipe(map(res=>res));
  }
  
}
