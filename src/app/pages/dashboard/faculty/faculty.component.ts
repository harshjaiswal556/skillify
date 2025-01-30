import { Component } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { CourseService } from '../../../services/course.service';
import { SignUpService } from '../../../services/auth/sign-up.service';

@Component({
  selector: 'app-faculty',
  standalone: false,
  
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent {

  constructor (private user : LoginService, private courseService : CourseService, private signUpService : SignUpService){}

  deleteUser(){

    const deleteUserId = localStorage.getItem("userId")
    if (deleteUserId) {
      this.user.getUserById(deleteUserId).subscribe(res => {
        console.log(res.course);
        if (res.course) {
          for (let index = 0; index < res.course.length; index++) {
            const courseId = res.course[index];
            
            this.courseService.deleteCourseById(courseId).subscribe(res => {
              this.signUpService.removeCourseFromUser(deleteUserId, courseId).subscribe(res => {
                this.signUpService.removeCourseFromStudent(deleteUserId, courseId).subscribe(res => {
                  this.user.deleteUserById(deleteUserId).subscribe(res=>{
                    console.log(res);
                    alert("User deleted successfully");
                  })
                  window.location.reload();
                })
              })
            })
          }
        }else{
          this.user.deleteUserById(deleteUserId).subscribe(res=>{
            console.log(res);
            alert("User deleted successfully");
            window.location.reload();
          })
        }
      })
    }

    
  }
}
