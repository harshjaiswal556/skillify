import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { StudentReportService } from '../../../services/student/student-report.service';
import { CourseService } from '../../../services/course.service';
import { LoginService } from '../../../services/auth/login.service';
import { SecureStorageService } from '../../../services/auth/secure-storage.service';

@Component({
  selector: 'app-all-student',
  standalone: false,
  
  templateUrl: './all-student.component.html',
  styleUrl: './all-student.component.css'
})
export class AllStudentComponent {
studentData : any[] = [];
displayedData: any[] = [];
deleteUserId : string = '';
activateUserId : string = '';

currentPage: number = 1;
pageSize: number = 3;
totalPages: number = 0;

  constructor(private user : AdminReportService, private student : StudentReportService, private courseService : CourseService, private login : LoginService, private secureStorage : SecureStorageService){
    // const storageId = localStorage.getItem("userId");
    const userData = JSON.parse(secureStorage.getItem('encrypt'));
    if(userData){
      // this.user.getData(us).subscribe(res=>{
        if (userData.role === "admin") {
          this.student.getAllStudent().subscribe(res=>{
            this.studentData = res;
            this.totalPages = Math.ceil(this.studentData.length / this.pageSize);
            this.updateDisplayedData();
            // console.log(res);
          })
        }
      // })
    }
    
  }


  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.studentData.slice(startIndex, startIndex + this.pageSize);
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
      this.login.getUserById(this.deleteUserId).subscribe(res=>{
        if (res) {
          this.login.deleteUserByIdAdmin(this.deleteUserId).subscribe(res=>{
            alert("User deactivated successfully!!!");
            window.location.reload();
          })
        }
      })    
  }
}
  // deleteUser(){
  //   console.log(this.deleteUserId);
  //   this.user.getData(this.deleteUserId).subscribe(res => {
  //     if (res[0].course) {
  //       for (let index = 0; index < res[0].course.length; index++) {
  //       const courseId = res[0].course[index].courseId;
          
  //       this.courseService.removeStudentToCourse(this.deleteUserId, courseId).subscribe(res=>{
  //         this.user.deleteUserById(this.deleteUserId).subscribe(res=>{
  //           alert("Student Deleted");
  //         })
  //       })
  //     }
  //   }
      
  //   })
  // }

  activateUserById(id : string){
    this.activateUserId = id
    }
    
    activateUser(){
      // const adminUserId = localStorage.getItem("userId")
      const userData = JSON.parse(this.secureStorage.getItem('encrypt'));
        if (userData) {
          this.login.getUserById(this.activateUserId).subscribe(res=>{
            if (res) {
              this.login.activateUserByIdAdmin(this.activateUserId).subscribe(res=>{
                alert("User activated successfully!!!");
                window.location.reload();
              })
            }
          })  
        }
    }
    
}
