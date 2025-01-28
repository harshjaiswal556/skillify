import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { StudentReportService } from '../../../services/student/student-report.service';

@Component({
  selector: 'app-all-student',
  standalone: false,
  
  templateUrl: './all-student.component.html',
  styleUrl: './all-student.component.css'
})
export class AllStudentComponent {
studentData : any[] = [];
  constructor(private user : AdminReportService, private student : StudentReportService){
    const storageId = localStorage.getItem("userId");
    if(storageId){
      this.user.getData(storageId).subscribe(res=>{
        if (res[0].role === "admin") {
          this.student.getAllStudent().subscribe(res=>{
            this.studentData = res;
            console.log(res);
          })
        }
      })
    }
    
  }
}
