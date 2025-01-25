import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn : boolean = false

  constructor(private route : Router){
    const storageId = localStorage.getItem("userId");
    if (storageId) {
      this.isLoggedIn = true;
    }
  }

  logOut(){
    localStorage.removeItem("userId");
    this.route.navigate(["/login"])
  }
}
