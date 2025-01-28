import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { LoginService } from '../../../services/auth/login.service';
import { CourseService } from '../../../services/course.service';
import { SignUpService } from '../../../services/auth/sign-up.service';

@Component({
  selector: 'app-all-faculty',
  standalone: false,

  templateUrl: './all-faculty.component.html',
  styleUrl: './all-faculty.component.css'
})
export class AllFacultyComponent {

  userData: any[] = [];
  facultyData: any[] = [];
  role: string = '';
  deleteUserId : string = '';

  constructor(private user: AdminReportService, private faculty: FacultyReportService, private courseService : CourseService, private signUpService : SignUpService) {
    const storageId = localStorage.getItem("userId");
    if (storageId) {
      this.user.getData(storageId).subscribe(res => {
        if (res[0].role === "admin") {
          this.faculty.getAllFaculty().subscribe(res => {
            this.facultyData = res;
            this.role = 'faculty'
            console.log(res);

          })
        }
      })
    }

  }

  deleteUserById(id : string){
    this.deleteUserId = id;
  }
  deleteUser(){
    console.log(this.deleteUserId);
    
    this.user.getData(this.deleteUserId).subscribe(res => {
      console.log(res[0].course);
      if (res[0].course) {
        for (let index = 0; index < res[0].course.length; index++) {
          const courseId = res[0].course[index];
          
          this.courseService.deleteCourseById(courseId).subscribe(res => {
            this.signUpService.removeCourseFromUser(this.deleteUserId, courseId).subscribe(res => {
              this.signUpService.removeCourseFromStudent(this.deleteUserId, courseId).subscribe(res => {
                this.user.deleteUserById(this.deleteUserId).subscribe(res=>{
                  console.log(res);
                  alert("User deleted successfully");
                })
                window.location.reload();
              })
            })
          })
        }
      }else{
        this.user.deleteUserById(this.deleteUserId).subscribe(res=>{
          console.log(res);
          alert("User deleted successfully");
          window.location.reload();
        })
      }
    })

    
  }
}
