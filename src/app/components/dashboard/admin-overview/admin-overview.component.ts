import { Component } from '@angular/core';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { CourseService } from '../../../services/course.service';
import { StudentReportService } from '../../../services/student/student-report.service';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-overview',
  standalone: false,
  
  templateUrl: './admin-overview.component.html',
  styleUrl: './admin-overview.component.css'
})
export class AdminOverviewComponent {

userData : any[] = [];
courseData : any[] = [];
facultyData : any[] = [];
studentData : any[] = [];

isCourses : boolean = true;
isFaculty : boolean = false;
isStudent : boolean = false;

  constructor(private user : AdminReportService, private course : CourseService, private faculty : FacultyReportService, private student : StudentReportService, private route : Router){
    const storageId = localStorage.getItem("userId");
    if(storageId){
      this.user.getData(storageId).subscribe(res => {
        console.log(res);
        this.userData = res;
      })

      this.course.getCourses().subscribe(res=>{
        this.courseData = res
      })

      this.faculty.getAllFaculty().subscribe(res=>{
        this.facultyData = res;
      })

      this.student.getAllStudent().subscribe(res=>{
        this.studentData = res;
      })
    }
    
  }
  activeComponent: string = 'course'; 

  displayComponent(component: string): void {
    this.activeComponent = component;
  }
}
