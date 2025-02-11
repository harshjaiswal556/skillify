import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/reducer/auth.reducer';
import { login } from '../../../store/action/auth.action';
// import { selectUser } from '../../../store/selector/auth.selector';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm!: FormGroup;

  loginUser$ : Observable<any> | undefined
  
  constructor(
    private fb: FormBuilder, 
    private store: Store<{auth : AuthState}>, 
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.store.dispatch(login({ email, password }));

      this.store.select('auth').pipe().subscribe(user => {
        // console.log(user);
        // debugger
        if (user) {
          switch (user.user.role) {
            case 'faculty':
              this.router.navigate(['faculty-dashboard']);
              break;
            case 'student':
              this.router.navigate(['student-dashboard']);
              break;
            default:
              this.router.navigate(['admin-dashboard']);
          }
        }
      });
    }
  }
}
