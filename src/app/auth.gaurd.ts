// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     if (localStorage.getItem('userId')) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }

// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from './store/reducer/auth.reducer';
import { selectIsLoggedIn, selectUser } from './store/selector/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store<{auth : AuthState}>, 
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(// Take only the first emitted value
      map(isLoggedIn => {
        if (isLoggedIn) {
          // If user is logged in, allow navigation
          return true;
        } else {
          // If user is not logged in, navigate to login page
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
