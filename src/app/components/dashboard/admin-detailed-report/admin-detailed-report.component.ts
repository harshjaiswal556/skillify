import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { CourseService } from '../../../services/course.service';
import { StudentReportService } from '../../../services/student/student-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { SignUpService } from '../../../services/auth/sign-up.service';
import { SecureStorageService } from '../../../services/auth/secure-storage.service';

@Component({
  selector: 'app-admin-detailed-report',
  standalone: false,

  templateUrl: './admin-detailed-report.component.html',
  styleUrl: './admin-detailed-report.component.css'
})
export class AdminDetailedReportComponent {

  userData: any[] = [];
  courseData: any[] = [];
  displayedData: any[] = [];
  userId : string = ''

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private user: AdminReportService, private course: CourseService, private signUp : SignUpService, private secureStorage : SecureStorageService) {
    // const storageId = localStorage.getItem("userId");
    const userData = JSON.parse(secureStorage.getItem('encrypt'))
    if (userData) {
      // this.user.getData(storageId).subscribe(res => {
        if (userData.role === "admin") {
          this.course.getCourses().subscribe(res => {
            this.courseData = res;
            this.totalPages = Math.ceil(this.courseData.length / this.pageSize);
            this.updateDisplayedData();
            this.userId = userData.id;
            // console.log("hello");
            
          })
        }
      // })

    }
  }

  deleteCourseId: string = '';
  activateCourseId: string = '';
  totalNoOfStudents: number = 0;

  title: string = '';
  duration: number = 0;
  id: string = '';
  description: string = '';

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.courseData.slice(startIndex, startIndex + this.pageSize);
    // console.log("displayed data: "+this.displayedData);
    
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

  deleteCourseById(id: string, totalStd: number) {
    this.deleteCourseId = id;
    this.totalNoOfStudents = totalStd
  }

  activateCourseById(id: string){
    this.activateCourseId = id;
  }

  deleteCourse() {
    this.course.deactivateCourseById(this.deleteCourseId).subscribe(res=>{
      alert("The course has been deactivated.");
      window.location.reload();
    })
  }

  editCourseById(title: string, duration: number, description: string, id: string) {
    this.title = title;
    this.duration = duration;
    this.description = description;
    this.id = id;
  }

  activateCourse(){
    this.course.activateCourseById(this.activateCourseId).subscribe(res=>{
        alert("Course activated successfully!!!")
        window.location.reload();
    })
  }

}
