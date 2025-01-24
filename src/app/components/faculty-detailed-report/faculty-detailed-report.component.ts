import { Component } from '@angular/core';
import { FacultyReportService } from '../../services/faculty/faculty-report.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-faculty-detailed-report',
  standalone: false,
  
  templateUrl: './faculty-detailed-report.component.html',
  styleUrl: './faculty-detailed-report.component.css'
})
export class FacultyDetailedReportComponent {

  reports: any[] = [];

  constructor (private facultyReportService : FacultyReportService, private courseService : CourseService){
    this.facultyReportService.getData().subscribe(res=>{
      console.log(res);
      this.reports = res
    })
  }

  deleteCourseId : string = '';

  title: string = '';
  price : number = 0;
  id : string = '';
  description : string = '';

  deleteCourseById(id : string){
    this.deleteCourseId = id;
  }
  
  deleteCourse(){
    this.courseService.deleteCourseById(this.deleteCourseId).subscribe(res => {
      console.log(res);
      window.location.reload();
    })
  }

  editCourseById(title : string, price : number, description : string, id : string){
    this.title = title;
    this.price = price;
    this.description = description;    
    this.id = id;
  }

}
