import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input() searchText: string = '';
  filteredCourses: Course[] = [];

  constructor(private courseService: CourseService){
    this.courseService.getCourses().subscribe(res=>{
      this.courses = res;
      this.filteredCourses = [...this.courses];
    })
  }  
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchText'] && this.courses) {
      this.filterCourses();
    }
  }

  filterCourses(): void {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredCourses = this.courses.filter((course) =>
      course.title.toLowerCase().includes(searchTextLower)
    );
  }

  get limitedCourses(): Course[] {
    return this.filteredCourses;
  }
}
