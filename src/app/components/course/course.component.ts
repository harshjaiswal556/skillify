import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course',
  standalone: false,
  
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  @Input() displayCoursesCount: number = 1;

  courses: any[] = [
    {
      "image":"assets/courses/mean.jpeg",
      "title":"MEAN Stack",
      "description":"JavaScript stack with MongoDB, Express.js, Angular, and Node.js.",
      "price":2399
    },
    {
      "image":"assets/courses/mern.jpeg",
      "title":"MERN Stack",
      "description":"JavaScript stack with MongoDB, Express.js, React, and Node.js.",
      "price":2399
    },
    {
      "image":"assets/courses/python.jpeg",
      "title":"ML - Python",
      "description":"A Versatile programming language for machine learning.",
      "price":3499
    }
  ]

  get limitedCourses() {
    return this.courses.slice(0, this.displayCoursesCount);
  }
  
}
