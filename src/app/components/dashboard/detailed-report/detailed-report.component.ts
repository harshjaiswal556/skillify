import { Component } from '@angular/core';
import { StudentReportService } from '../../../services/student/student-report.service';
import { CourseService } from '../../../services/course.service';
import { SignUpService } from '../../../services/auth/sign-up.service';
import { SecureStorageService } from '../../../services/auth/secure-storage.service';

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
  displayedData: any[] = [];

  currentPage: number = 1;
pageSize: number = 3;
totalPages: number = 0;

  constructor (private studentReportService : StudentReportService, private courseService: CourseService, private signUpService : SignUpService, private secureStorage : SecureStorageService){

    // const storageId = localStorage.getItem("userId");

    const userData = JSON.parse(secureStorage.getItem('encrypt'));

    if (userData) {
      
      this.studentReportService.getData(userData.id).subscribe(res=>{
        this.courses = res[0].course;
        for (let index = 0; index < this.courses.length; index++) {
          this.courseService.getCoursesById(this.courses[index].courseId).subscribe(res => {
            if(res && res.length>0){
              this.reports.push(res)
            }else{
              this.signUpService.removeCourseFromStudent(userData.id, this.courses[index].courseId).subscribe(res=>{
                // console.log(res);
              })
            }
            this.totalPages = Math.ceil(this.reports.length / this.pageSize);
            this.updateDisplayedData();
          })
        }
      })
    }
  }


  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.reports.slice(startIndex, startIndex + this.pageSize);
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

  
}
