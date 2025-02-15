
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';
import { SecureStorageService } from './services/auth/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private user : LoginService, private secureStorage : SecureStorageService) {}

  canActivate(): boolean {
    // const storageId = localStorage.getItem('userId');
    // if (storageId) {
    //   const userRole = '';
    //   this.user.getUserById(storageId).subscribe(res => {
    //     if (res.role) {
    //       this.router.navigate([`/${res.role}-dashboard`])
    //     }
    //   })
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // const storageId = localStorage.getItem('userId');
    const userData = JSON.parse(this.secureStorage.getItem('encrypt'));
    if (userData) {
      this.user.getUserById(userData.id).subscribe(res => {
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
