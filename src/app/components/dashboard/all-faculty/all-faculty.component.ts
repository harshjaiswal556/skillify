import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { LoginService } from '../../../services/auth/login.service';
import { CourseService } from '../../../services/course.service';
import { SignUpService } from '../../../services/auth/sign-up.service';
import { Router } from '@angular/router';
import { SecureStorageService } from '../../../services/auth/secure-storage.service';

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
  activateUserId : string = '';

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private user: AdminReportService, private faculty: FacultyReportService, private courseService : CourseService, private loginService : LoginService, private router : Router, private secureStorage : SecureStorageService) {
    // const storageId = localStorage.getItem("userId");
    const userData = JSON.parse(secureStorage.getItem('encrypt'));
    if (userData) {
      // this.user.getData(storageId).subscribe(res => {
        if (userData.role === "admin") {
          this.faculty.getAllFaculty().subscribe(res => {
            this.facultyData = res;
            this.totalPages = Math.ceil(this.facultyData.length / this.pageSize);
            this.updateDisplayedData();
            this.role = 'faculty'
            // console.log(res);

          })
        }
      // })
    }

  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.facultyData.slice(startIndex, startIndex + this.pageSize);
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

  deleteUserById(id : string){
    this.deleteUserId = id;
  }
  deleteUser(){
    // const adminUserId = localStorage.getItem("userId")
    const userData = JSON.parse(this.secureStorage.getItem('encrypt'));
    if (userData) {
      this.loginService.getUserById(this.deleteUserId).subscribe(res=>{
        if (res) {
          this.loginService.deleteUserByIdAdmin(this.deleteUserId).subscribe(res=>{
            alert("User deactivated successfully!!!");
            window.location.reload();
          })
        }
      })    
  }
}

activateUserById(id : string){
this.activateUserId = id
}

activateUser(){
  // const adminUserId = localStorage.getItem("userId")
  const userData = JSON.parse(this.secureStorage.getItem('encrypt'));
    if (userData) {
      this.loginService.getUserById(this.activateUserId).subscribe(res=>{
        if (res) {          
          this.loginService.activateUserByIdAdmin(this.activateUserId).subscribe(res=>{
            alert("User activated successfully!!!");
            window.location.reload();
          })
        }
      })  
    }
}

}