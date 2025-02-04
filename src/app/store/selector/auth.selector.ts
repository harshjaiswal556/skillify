import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state: AuthState) => {
        return state.isLoggedIn
    }
);

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => {
        console.log("Auth state", state);
        return state.user
    }
  );
