import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentReportService {
  protected url = 'http://localhost:3000/courses'
  constructor(private http : HttpClient) { }
  getData():Observable<any>{
    return this.http.get(this.url).pipe(map(res=>res))
  }
}
