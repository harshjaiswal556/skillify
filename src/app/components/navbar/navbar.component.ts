import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn : boolean = false
  role : string = '';

  constructor(private route : Router, private user : LoginService){
    const storageId = localStorage.getItem("userId");
    if (storageId) {
      this.isLoggedIn = true;
      this.user.getUserById(String(storageId)).subscribe(res=>{
        this.role = res.role        
      })
    }
  }

  logOut(){
    localStorage.removeItem("userId");
    this.route.navigate(["/login"])
  }
}
