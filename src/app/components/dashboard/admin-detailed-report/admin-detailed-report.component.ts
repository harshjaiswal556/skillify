import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { CourseService } from '../../../services/course.service';
import { StudentReportService } from '../../../services/student/student-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';

@Component({
  selector: 'app-admin-detailed-report',
  standalone: false,
  
  templateUrl: './admin-detailed-report.component.html',
  styleUrl: './admin-detailed-report.component.css'
})
export class AdminDetailedReportComponent {

userData : any[] = [];
courseData : any[] = [];
facultyData : any[] = [];
studentData : any[] = [];

  constructor(private user : AdminReportService, private course : CourseService, private faculty : FacultyReportService, private student : StudentReportService){
    const storageId = localStorage.getItem("userId");
    if(storageId){
      // this.user.getData(storageId).subscribe(res => {
      //   console.log(res);
      //   this.userData = res;
      // })

      this.course.getCourses().subscribe(res=>{
        this.courseData = res
        console.log(res);
        
      })

      // this.faculty.getAllFaculty().subscribe(res=>{
      //   this.facultyData = res;
      // })

      // this.faculty.getAllFaculty().subscribe(res=>{
      //   this.facultyData = res;
      // })
    }
    
  }
}
