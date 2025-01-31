import { Component } from '@angular/core';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { CourseService } from '../../../services/course.service';
import { StudentReportService } from '../../../services/student/student-report.service';
import { AdminReportService } from '../../../services/admin/admin-report.service';
import { Router } from '@angular/router';

import Chart from 'chart.js/auto';

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

chartLabel : string[] = [];
chartData : number[] = [];
chartType : any;
activeComponent: string = 'course'; 

  constructor(private user : AdminReportService, private course : CourseService, private faculty : FacultyReportService, private student : StudentReportService, private route : Router){
    const storageId = localStorage.getItem("userId");
    this.chartType = 'bar'
    if(storageId){
      this.user.getData(storageId).subscribe(res => {
        console.log(res);
        this.userData = res;
      })

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
    }else if (this.activeComponent === 'faculty') {
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
