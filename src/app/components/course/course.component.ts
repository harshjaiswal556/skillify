import { Component, Input } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  standalone: false,
  
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  courses: any[] = [];
  courseLength: number = 0;

  @Input() displayCoursesCount: number = this.courseLength;

  constructor(private courseService: CourseService){
    this.courses = courseService.getCourses();    
    this.displayCoursesCount = this.courses.length;
  }
  
  get limitedCourses() {
    return this.courses.slice(0, this.displayCoursesCount);
  }
  
}
