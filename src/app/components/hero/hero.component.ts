import { Component } from '@angular/core';
import { SignUpService } from '../../services/auth/sign-up.service';
import { LoginService } from '../../services/auth/login.service';
import { FacultyReportService } from '../../services/faculty/faculty-report.service';

@Component({
  selector: 'app-hero',
  standalone: false,
  
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  isLoggedin : boolean = false;
  role : string = '';

  constructor(private user : FacultyReportService){
    const storageId = localStorage.getItem("userId");
    
      if (storageId) {
        this.isLoggedin = true
        this.user.getData(String(storageId)).subscribe(res=>{
          this.role = res[0].role        
        })
      }
  }
}
