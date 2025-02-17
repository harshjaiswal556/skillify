
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';
import { SecureStorageService } from './services/auth/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  navigationInProgress: boolean = false;

  constructor(private router: Router, private user : LoginService, private secureStorage : SecureStorageService) {}

  canActivate(): boolean {
    const userData = JSON.parse(this.secureStorage.getItem('encrypt'));
    if (userData) {
      if (!this.navigationInProgress) {
        this.navigationInProgress = true;
        this.router.navigate([`/${userData.role}-dashboard`]).then(() => {
          this.navigationInProgress = false;
        });
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
