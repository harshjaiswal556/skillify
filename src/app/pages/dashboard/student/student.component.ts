import { Component } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-student',
  standalone: false,
  
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  constructor(private user : LoginService, private courseService : CourseService){

  }
  
  deleteUser(){
    const deleteUserId = localStorage.getItem("userId");
    console.log(deleteUserId);
    
    if (deleteUserId) {
      this.user.getUserById(deleteUserId).subscribe(res => {
        if (res.course) {
          for (let index = 0; index < res.course.length; index++) {
          const courseId = res.course[index].courseId;
            
          this.courseService.removeStudentToCourse(deleteUserId, courseId).subscribe(res=>{
            this.user.deleteUserById(deleteUserId).subscribe(res=>{
              alert("Student Deleted");
              localStorage.removeItem("userId")
            })
          })
        }
      }
        
      })
    }
  }
}
