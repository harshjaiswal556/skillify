import { Component } from '@angular/core';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { CourseService } from '../../../services/course.service';
import { StudentReportService } from '../../../services/student/student-report.service';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { SignUpService } from '../../../services/auth/sign-up.service';

@Component({
  selector: 'app-admin-detailed-report',
  standalone: false,

  templateUrl: './admin-detailed-report.component.html',
  styleUrl: './admin-detailed-report.component.css'
})
export class AdminDetailedReportComponent {

  userData: any[] = [];
  courseData: any[] = [];
  displayedData: any[] = [];
  userId : string = ''

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private user: AdminReportService, private course: CourseService, private signUp : SignUpService) {
    const storageId = localStorage.getItem("userId");
    if (storageId) {
      this.user.getData(storageId).subscribe(res => {
        if (res[0].role === "admin") {
          this.course.getCourses().subscribe(res => {
            this.courseData = res;
            this.totalPages = Math.ceil(this.courseData.length / this.pageSize);
            this.updateDisplayedData();
            this.userId = storageId;
          })
        }
      })

    }
  }

  deleteCourseId: string = '';

  title: string = '';
  duration: number = 0;
  id: string = '';
  description: string = '';

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.courseData.slice(startIndex, startIndex + this.pageSize);
    console.log("displayed data: "+this.displayedData);
    
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

  deleteCourseById(id: string) {
    this.deleteCourseId = id;
  }

  deleteCourse() {
    this.course.deleteCourseById(this.deleteCourseId).subscribe(res => {
      this.signUp.removeCourseFromUser(this.userId, this.deleteCourseId).subscribe(res => {
        console.log(res);
        window.location.reload();
      })
    })
  }

  editCourseById(title: string, duration: number, description: string, id: string) {
    this.title = title;
    this.duration = duration;
    this.description = description;
    this.id = id;
  }

}
