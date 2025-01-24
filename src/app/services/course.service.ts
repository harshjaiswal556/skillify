import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  protected url = 'http://localhost:3000/courses';

  getCourses(): Observable<any> {
    return this.http.get(this.url).pipe(map(res => res));
  }

  addCourses(item: any): Observable<any> {
    return this.http.post<any>(this.url, item)
  }

  updateCourseById(id : string, courseData : any): Observable<any>{
    return this.http.put(`${this.url}/${id}`, courseData)
  }

  deleteCourseById(id:string):Observable<any>{
    return this.http.delete(this.url+"/"+id);
  }
}
