import { Component } from '@angular/core';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { CourseService } from '../../../services/course.service';
import { StudentReportService } from '../../../services/student/student-report.service';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { Router } from '@angular/router';

import Chart from 'chart.js/auto';
import { SecureStorageService } from '../../../services/auth/secure-storage.service';

@Component({
  selector: 'app-admin-overview',
  standalone: false,
  
  templateUrl: './admin-overview.component.html',
  styleUrl: './admin-overview.component.css'
})
export class AdminOverviewComponent {

userData : any = [];
courseData : any[] = [];
facultyData : any[] = [];
studentData : any[] = [];

isCourses : boolean = true;
isFaculty : boolean = false;
isStudent : boolean = false;

chartLabel : string[] = [];
chartData : number[] = [];
chartType : any;
activeComponent: string = 'course'; 

  constructor(private user : AdminReportService, private course : CourseService, private faculty : FacultyReportService, private student : StudentReportService, private route : Router, private secureStorage : SecureStorageService){

    // const storageId = localStorage.getItem("userId");

    const userData = JSON.parse(secureStorage.getItem('encrypt'));

    this.chartType = 'bar'
    if(userData){
      // this.user.getData(storageId).subscribe(res => {
      //   this.userData = res[0];
      //   console.log(this.userData);
      // })
      this.userData = userData

      this.course.getCourses().subscribe(res=>{
        this.courseData = res
        this.courseData.map((item: { title: string; students: any[]; }) => {
          this.chartLabel.push(item.title);
          if (!item.students) {
            this.chartData.push(0);
          }else{
            this.chartData.push(item.students.length);
          }
        });
      })

      this.faculty.getAllFaculty().subscribe(res=>{
        this.facultyData = res;
      })

      this.student.getAllStudent().subscribe(res=>{
        this.studentData = res;
        
      })
    }
    
  }

  displayComponent(component: string): void {
    this.activeComponent = component;
    if (this.activeComponent === 'course') {
      this.chartLabel = []
      this.chartData = []
      this.courseData.map((item: { title: string; students: any[]; }) => {
        this.chartLabel.push(item.title);
        if (!item.students) {
          this.chartData.push(0);
        }else{
          this.chartData.push(item.students.length);
        }
      });
    }else 
    if (this.activeComponent === 'faculty') {
      this.chartLabel = []
      this.chartData = []
      this.facultyData.map((item: { name: string; course: any[]; }) => {
        this.chartLabel.push(item.name);
        if (!item.course) {
          this.chartData.push(0);
        }else{
          this.chartData.push(item.course.length);
        }
      });
    }else if (this.activeComponent === 'student') {
      this.chartLabel = []
      this.chartData = []
      this.studentData.map((item: { name: string; course: any[]; }) => {
        this.chartLabel.push(item.name);
        if (!item.course) {
          this.chartData.push(0);
        }else{
          this.chartData.push(item.course.length);
        }
      });
    }
  }

  chartTypeToggle(type : string){
    this.chartType = type    
  }


}
