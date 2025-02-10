import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { LoginService } from '../../services/auth/login.service';
import { login, loginSuccess, loginFailure, verifyUser } from '../action/auth.action';

@Injectable()
export class AuthEffects {
    login$;
    // loginById$;
    userId = localStorage.getItem("userId")
  constructor(private actions$: Actions, private authService: LoginService) {

  this.login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.authService.getUser(email, password).pipe(
          map(user => {
            if (user) {
              return loginSuccess({ user:user });
            } else {
              return loginFailure({ error: 'Invalid credentials' });
            }
          })
        )
      )
    );
  });

  // this.loginById$ = createEffect(()=>{
  //   return this.actions$.pipe(
  //     ofType(verifyUser),
  //     switchMap(() =>
  //       // const userId = localStorage.getItem("userId");
  //       this.authService.getUserById("7234").pipe(
  //         map(user => {
  //           console.log(user);
  //           if (user) {
  //             return loginSuccess({ user:user });
  //           } else {
  //             return loginFailure({ error: 'Invalid credentials' });
  //           }
  //         })
  //       )
  //     )
  //   );
  // })
  
}
}
