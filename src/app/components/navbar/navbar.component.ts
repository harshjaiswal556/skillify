import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { SecureStorageService } from '../../services/auth/secure-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn : boolean = false
  role : string = '';

  constructor(private route : Router, private user : LoginService, private secureStorage : SecureStorageService){
    // const storageId = localStorage.getItem("userId");
    const userData= JSON.parse(secureStorage.getItem('encrypt'));
    if (userData) {
      this.isLoggedIn = true;
      // this.user.getUserById(String(storageId)).subscribe(res=>{
        this.role = userData.role        
      // })
    }
  }

  logOut(){
    // localStorage.removeItem("userId");
    // localStorage.removeItem("user");
    localStorage.clear()
    this.route.navigate(["/login"])
  }
}
