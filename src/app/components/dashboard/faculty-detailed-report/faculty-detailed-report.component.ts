import { Component } from '@angular/core';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { CourseService } from '../../../services/course.service';
import { SignUp } from '../../authentication/sign-up-form/sign-up-form.interface';
import { SignUpService } from '../../../services/auth/sign-up.service';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-faculty-detailed-report',
  standalone: false,

  templateUrl: './faculty-detailed-report.component.html',
  styleUrl: './faculty-detailed-report.component.css'
})
export class FacultyDetailedReportComponent {

  reports: any[] = [];
  courses: any[] = [];
  displayedData: any[] = [];
  currentUser: SignUp | null = null;
  userId: string = '';

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private facultyReportService: FacultyReportService, private courseService: CourseService, private userService: LoginService, private signUpService: SignUpService) {

    const storageId = localStorage.getItem("userId");

    // this.userService.currentUser$.subscribe(user => {
      if (storageId) {
        // this.currentUser = user
        this.userId = storageId
        console.log(storageId);
        this.facultyReportService.getData(storageId).subscribe(res => {
          this.courses = res[0].course;
          for (let index = 0; index < this.courses.length; index++) {
            this.courseService.getCoursesById(this.courses[index]).subscribe(res => {
              this.reports.push(res)
              this.totalPages = Math.ceil(this.reports.length / this.pageSize);
              this.updateDisplayedData();
            })
          }
        })
      }
  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.reports.slice(startIndex, startIndex + this.pageSize);
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


  deleteCourseId: string = '';
  activateCourseId: string = '';
  totalNoOfStudents: number = 0;

  title: string = '';
  duration: number = 0;
  id: string = '';
  description: string = '';

  deleteCourseById(id: string, totalStd: number) {
    this.deleteCourseId = id;
    this.totalNoOfStudents = totalStd
  }

  activateCourseById(id: string){
    this.activateCourseId = id;
  }

  deleteCourse() {
    if (this.totalNoOfStudents === 0) {
      this.courseService.deleteCourseById(this.deleteCourseId).subscribe(res=>{
        this.signUpService.removeCourseFromUser(this.userId, this.deleteCourseId).subscribe(res=>{
          alert("Course deleted successfully!!!")
          window.location.reload();
        })
      })
    }else{
      this.courseService.deactivateCourseById(this.deleteCourseId).subscribe(res=>{
        alert("Students are enrolled in this course, the course has been deactivated.");
        window.location.reload();
      })
    }
  }

  editCourseById(title: string, duration: number, description: string, id: string) {
    this.title = title;
    this.duration = duration;
    this.description = description;
    this.id = id;
  }

  activateCourse(){
      this.courseService.activateCourseById(this.activateCourseId).subscribe(res=>{
          alert("Course activated successfully!!!")
          window.location.reload();
      })
    }
}
