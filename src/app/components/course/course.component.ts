import { Component, Input, SimpleChanges } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from './course.interface';
import { SignUpService } from '../../services/auth/sign-up.service';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-course',
  standalone: false,
  
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  courses!: Course[]
  courseLength: number = 0;

  isStudentLoggedIn : boolean = false;
  isCoursePurchased : boolean = false;
  purchasedCourseIds: Set<string> = new Set();

  @Input() displayCoursesCount: number = this.courseLength;
  @Input() searchText: string = '';
  filteredCourses: Course[] = [];

  displayedData: any[] = [];

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private courseService: CourseService, private userService : SignUpService, private loginService : LoginService){
    
    const storageId = localStorage.getItem("userId");

    this.courseService.getCourses().subscribe(res=>{
      this.courses = res.filter((course: { isDeactivate: boolean; }) => !course.isDeactivate);
      this.filteredCourses = [...this.courses];
      console.log(this.filteredCourses);
      
      this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize);
      this.updateDisplayedData();
    })
    // console.log(this.displayCoursesCount);

    if (storageId) {
      this.loginService.getUserById(storageId).subscribe(res=>{
        if (res.role === "student") {
          this.isStudentLoggedIn = true
          if (res.course) {
            for (let index = 0; index < res.course.length; index++) {
              this.purchasedCourseIds.add(res.course[index].courseId);
            }
          }
          
        }
      })
    }
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
    this.updateDisplayedData();
  }

  get limitedCourses(): Course[] {
    if (this.displayCoursesCount===0) {
      return this.filteredCourses;
    }
    return this.filteredCourses.slice(0, this.displayCoursesCount);
  }

  purchaseCourse(courseId : string){
    const storageId = localStorage.getItem("userId");
    if(storageId){      
      this.userService.addCourseToStudent(storageId, courseId).subscribe(res=>{
        this.courseService.addStudentToCourse(storageId, courseId).subscribe(res=>{
          alert("Course added successfully!!!");
          window.location.reload();
        })
      })
    }
  }

  removeCourse(courseId : string){
    const storageId = localStorage.getItem("userId");
    if(storageId){      
      this.userService.removeCourseFromStudent(storageId, courseId).subscribe(res=>{
        this.courseService.removeStudentToCourse(storageId, courseId).subscribe(res=>{
          alert("Course removed successfully!!!");
          window.location.reload()
        })
      })
    }
  }
  updateDisplayedData() {
    if (this.displayCoursesCount > 0) {
      this.displayedData = this.filteredCourses.slice(0, this.displayCoursesCount);
    } else {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.displayedData = this.filteredCourses.slice(startIndex, startIndex + this.pageSize);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedData();
    }
  }
}
