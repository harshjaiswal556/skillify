import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { LoginService } from '../../services/auth/login.service';
import { login, loginSuccess, loginFailure } from '../action/auth.action';

@Injectable()
export class AuthEffects {
    login$;
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
  
}
}
