import { Component } from '@angular/core';
import { StudentReportService } from '../../services/student/student-report.service';
import { CourseService } from '../../services/course.service';

export interface PeriodicElement {
  name: string;
  position: number;
  order_value: number;
  date: Date;
}

@Component({
  selector: 'app-detailed-report',
  standalone: false,
  
  templateUrl: './detailed-report.component.html',
  styleUrl: './detailed-report.component.css'
})
export class DetailedReportComponent {

  reports: any[] = [];
  courses: any[] = [];

  constructor (private studentReportService : StudentReportService, private courseService: CourseService){

    const storageId = localStorage.getItem("userId");

    if (storageId) {
      
      this.studentReportService.getData(storageId).subscribe(res=>{
        this.courses = res[0].course;
        for (let index = 0; index < this.courses.length; index++) {
          this.courseService.getCoursesById(this.courses[index].courseId).subscribe(res => {
            this.reports.push(res)
            console.log(this.reports);
          })
        }
      })
    }
  }
  
}
