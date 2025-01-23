import { Component } from '@angular/core';

@Component({
  selector: 'app-faculty-detailed-report',
  standalone: false,
  
  templateUrl: './faculty-detailed-report.component.html',
  styleUrl: './faculty-detailed-report.component.css'
})
export class FacultyDetailedReportComponent {
  reports: any[] = [
    {position: 1, name: 'ML - Python', order_value: 100, date: new Date('2025-01-01'), students: 10 },
    { position: 2, name: 'MEAN Stack', order_value: 200, date: new Date('2025-02-01'), students: 20 },
    { position: 3, name: 'MERN Stack', order_value: 300, date: new Date('2025-03-01'), students: 11 },
  ];
}
