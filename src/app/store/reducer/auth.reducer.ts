import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../action/auth.action';

export interface AuthState {
  user: any;
  isLoggedIn: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.verifyUser, (state) => {
    const persistedState = localStorage.getItem('userId'); 
    console.log(persistedState);
    return persistedState ? JSON.parse(persistedState) : state;        
  }),

  on(AuthActions.login, (state, { email, password }) => ({
    ...state,
    isLoggedIn: false,  
    user: null,        
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,  
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
    user: null,  
  }))
);

