import { Component } from '@angular/core';
import { FacultyReportService } from '../../services/faculty/faculty-report.service';

@Component({
  selector: 'app-overview',
  standalone: false,
  
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

  userData : any[] = [];

  constructor(private user : FacultyReportService){
    const storageId = localStorage.getItem("userId");
    if(storageId){
      this.user.getData(storageId).subscribe(res => {
        console.log(res);
        this.userData = res;
      })
    }
  }
}
