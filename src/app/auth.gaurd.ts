// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// }

// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private user : LoginService) {}

  canActivate(): boolean {
    const storageId = localStorage.getItem('userId');
    if (storageId) {
      const userRole = '';
      this.user.getUserById(storageId).subscribe(res => {
        if (res.role) {
          this.router.navigate([`/${res.role}-dashboard`])
        }
      })
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
