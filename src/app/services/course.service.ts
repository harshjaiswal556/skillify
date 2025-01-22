import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
 protected url = 'http://localhost:3000/courses';

  getCourses(): Observable<any> {
    return this
            .http
              .get(this.url)
            .pipe(
              map(res => res)
          );
      }

  // courses = [
  //   {
  //     "image":"assets/courses/mean.jpeg",
  //     "title":"MEAN Stack",
  //     "description":"JavaScript stack with MongoDB, Express.js, Angular, and Node.js.",
  //     "price":2399,
  //     "tag":"web"
  //   },
  //   {
  //     "image":"assets/courses/mern.jpeg",
  //     "title":"MERN Stack",
  //     "description":"JavaScript stack with MongoDB, Express.js, React, and Node.js.",
  //     "price":2399,
  //     "tag":"web"
  //   },
  //   {
  //     "image":"assets/courses/python.jpeg",
  //     "title":"ML - Python",
  //     "description":"A Versatile programming language for machine learning.",
  //     "price":3499,
  //     "tag":"python"
  //   },
  //   {
  //     "image":"assets/courses/python.jpeg",
  //     "title":"Data Science - Python",
  //     "description":"A Versatile programming language for Data Science.",
  //     "price":3499,
  //     "tag":"python"
  //   },
  //   {
  //     "image":"assets/courses/mern.jpeg",
  //     "title":"Kotlin",
  //     "description":"Beginner friendly course to start your journey in App Development.",
  //     "price":1499,
  //     "tag":"App"
  //   },
  //   {
  //     "image":"assets/courses/mean.jpeg",
  //     "title":"MySQL",
  //     "description":"Learn basic to intermediate level of MySQL Database.",
  //     "price":499,
  //     "tag":"Database"
  //   },
  //   {
  //     "image":"assets/courses/mern.jpeg",
  //     "title":"App - Java",
  //     "description":"Start learning App Development using Java language.",
  //     "price":3499,
  //     "tag":"App"
  //   }
  // ]

  // constructor() { }

  // getCourses(){
  //   return this.courses;
  // }
}
