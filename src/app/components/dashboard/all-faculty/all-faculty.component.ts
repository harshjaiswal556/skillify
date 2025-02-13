import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { LoginService } from '../../../services/auth/login.service';
import { CourseService } from '../../../services/course.service';
import { SignUpService } from '../../../services/auth/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-faculty',
  standalone: false,

  templateUrl: './all-faculty.component.html',
  styleUrl: './all-faculty.component.css'
})
export class AllFacultyComponent {

  userData: any[] = [];
  facultyData: any[] = [];
  displayedData: any[] = [];
  role: string = '';
  deleteUserId : string = '';

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private user: AdminReportService, private faculty: FacultyReportService, private courseService : CourseService, private loginService : LoginService, private router : Router) {
    const storageId = localStorage.getItem("userId");
    if (storageId) {
      this.user.getData(storageId).subscribe(res => {
        if (res[0].role === "admin") {
          this.faculty.getAllFaculty().subscribe(res => {
            this.facultyData = res;
            this.totalPages = Math.ceil(this.facultyData.length / this.pageSize);
            this.updateDisplayedData();
            this.role = 'faculty'
            console.log(res);

          })
        }
      })
    }

  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.facultyData.slice(startIndex, startIndex + this.pageSize);
    console.log("displayed data: "+this.displayedData);
    
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

  deleteUserById(id : string){
    this.deleteUserId = id;
  }
  deleteUser(){
    const adminUserId = localStorage.getItem("userId")
    if (adminUserId) {
      this.loginService.getUserById(this.deleteUserId).subscribe(res=>{
        if (res) {
          this.loginService.deleteUserByIdAdmin(this.deleteUserId).subscribe(res=>{
            alert("User deactivated successfully!!!");
          })
        }
      })
    // console.log(this.deleteUserId);
    
    // this.user.getData(this.deleteUserId).subscribe(res => {
    //   console.log(res[0].course);
    //   if (res[0].course) {
    //     for (let index = 0; index < res[0].course.length; index++) {
    //       const courseId = res[0].course[index];
          
    //       this.courseService.deleteCourseById(courseId).subscribe(res => {
    //         this.signUpService.removeCourseFromUser(this.deleteUserId, courseId).subscribe(res => {
    //           this.signUpService.removeCourseFromStudent(this.deleteUserId, courseId).subscribe(res => {
    //             this.user.deleteUserById(this.deleteUserId).subscribe(res=>{
    //               console.log(res);
    //               alert("User deleted successfully");
    //             })
    //             window.location.reload();
    //           })
    //         })
    //       })
    //     }
    //   }else{
    //     this.user.deleteUserById(this.deleteUserId).subscribe(res=>{
    //       console.log(res);
    //       alert("User deleted successfully");
    //       window.location.reload();
    //     })
    //   }
    // })

    
  }
}
}