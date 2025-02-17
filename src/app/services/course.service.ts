import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../components/course/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  protected url = 'http://localhost:3000/courses';

  getCourses(): Observable<any> {
    return this.http.get(this.url).pipe(map(res => res));
  }

  getCoursesById(id : string): Observable<any>{
    return this.http.get(`${this.url}?id=${id}`).pipe(map(res => res))
  }

  addCourses(item: any): Observable<any> {
    return this.http.post<any>(this.url, item)
  }

  updateCourseById(id : string, courseData : any): Observable<any>{
    return this.http.patch(`${this.url}/${id}`, courseData)
  }

  // deleteCourseById(id:string):Observable<any>{
  //   return this.http.delete(this.url+"/"+id);
  // }

  deactivateCourseById(id: string):Observable<any>{
    return this.http.patch(`${this.url}/${id}`, {isDeactivate : true});
  }

  activateCourseById(id: string):Observable<any>{
    return this.http.patch(`${this.url}/${id}`, {isDeactivate : false});
  }

  addStudentToCourse(userId : string, courseId : string):Observable<any>{
      return this.http.get<Course>(`${this.url}/${courseId}`).pipe(
        switchMap(user => {
          if (!user.students) {
            user.students = [];
          }
          user.students.push(userId);
          return this.http.put(`${this.url}/${courseId}`, user);
        })
      )
    }

    removeStudentToCourse(userId : string, courseId : string):Observable<any>{
      return this.http.get<Course>(`${this.url}/${courseId}`).pipe(
        switchMap(user => {
          user.students = user.students.filter(sId => sId !== userId)
          return this.http.put(`${this.url}/${courseId}`, user);
        })
      )
    }
}
