import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { SignUp } from '../../components/authentication/sign-up-form/sign-up-form.interface';

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

  addCourseToUser(userId : string, courseId : string):Observable<any>{
    return this.http.get<SignUp>(`${this.url}/${userId}`).pipe(
      switchMap(user => {
        if (!user.course) {
          user.course = [];
        }
        user.course.push(courseId);
        return this.http.put(`${this.url}/${userId}`, user);
      })
    )
  }

  addCourseToStudent(userId : string, courseId : string):Observable<any>{
    return this.http.get<SignUp>(`${this.url}/${userId}`).pipe(
      switchMap(user => {
        const currentDate = new Date().toISOString().split('T')[0];
        if (!user.course) {
          user.course = [];
        }
        user.course.push({ courseId: courseId, date: currentDate });
        return this.http.put(`${this.url}/${userId}`, user);
      })
    )
  }

  removeCourseFromUser(userId : string, courseId : string):Observable<any>{
    return this.http.get<SignUp>(`${this.url}/${userId}`).pipe(
      switchMap(user => {
        user.course = user.course.filter(id => id !== courseId);
        return this.http.put(`${this.url}/${userId}`, user);
      })
    )
  }

  removeCourseFromStudent(userId : string, courseId : string):Observable<any>{
    return this.http.get<SignUp>(`${this.url}/${userId}`).pipe(
      switchMap(user => {
        user.course = user.course.filter(cId => cId.courseId!==courseId);
        return this.http.put(`${this.url}/${userId}`, user)
      })
    )
  }
}
