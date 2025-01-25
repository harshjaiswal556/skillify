import { Component } from '@angular/core';
import { StudentReportService } from '../../services/student/student-report.service';

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

  reports: any[] = [
    // {position: 1, name: 'ML - Python', order_value: 100, date: new Date('2025-01-01') },
    // { position: 2, name: 'MEAN Stack', order_value: 200, date: new Date('2025-02-01') },
    // { position: 3, name: 'MERN Stack', order_value: 300, date: new Date('2025-03-01') },
  ];

  constructor (private studentReportService : StudentReportService){
    this.studentReportService.getData().subscribe(res=>{
      this.reports = res;
    })
  }
  
}
