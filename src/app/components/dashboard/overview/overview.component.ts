import { Component } from '@angular/core';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/reducer/auth.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  standalone: false,
  
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

  userData : any[] = [];
  count$ : Observable<any> | undefined;

  constructor(private user : FacultyReportService, private store: Store<{auth : AuthState}>){
    const storageId = localStorage.getItem("userId");
    if(storageId){
      this.user.getData(storageId).subscribe(res => {
        console.log(res);
        this.userData = res;
      })
    }
  }

  ngOnInit(){
    this.store.select('auth').pipe().subscribe(authUser => {
      console.log(authUser.user.email);
        if (authUser) {
          this.user.getData(authUser.user.id).subscribe(res => {
            console.log(res);
            this.userData = res;
          })
        }
      });
    
  }
}
