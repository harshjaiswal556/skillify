import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from './course.interface';

@Component({
  selector: 'app-course',
  standalone: false,
  
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  courses!: Course[]
  courseLength: number = 0;

  @Input() displayCoursesCount: number = this.courseLength;

  constructor(private courseService: CourseService){
    this.courseService.getCourses().subscribe(res=>{
      this.courses = res;
    })
  }  
  
  // ngOnInit(){
  //   this.courseService.getCourses().subscribe(res=>{
  //     this.courses = res;
  //   })
  // }

  get limitedCourses() {
    if (this.displayCoursesCount === 0) {
      return this.courses.slice(0, this.courses.length);
    }
    return this.courses.slice(0, this.displayCoursesCount);
  }
}
