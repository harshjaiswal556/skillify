import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  order_value: number;
  date: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'ML - Python', order_value: 100, date: new Date('2025-01-01') },
  { position: 2, name: 'MEAN Stack', order_value: 200, date: new Date('2025-02-01') },
  { position: 3, name: 'MERN Stack', order_value: 300, date: new Date('2025-03-01') },
];

@Component({
  selector: 'app-detailed-report',
  standalone: false,
  
  templateUrl: './detailed-report.component.html',
  styleUrl: './detailed-report.component.css'
})
export class DetailedReportComponent {
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: PeriodicElement) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Course Name',
      cell: (element: PeriodicElement) => `${element.name}`,
    },
    {
      columnDef: 'order_value',
      header: 'Order Value',
      cell: (element: PeriodicElement) => `${element.order_value}`,
    },
    {
      columnDef: 'date',
      header: 'Purchase Date',
      cell: (element: PeriodicElement) => `${element.date}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);
}
