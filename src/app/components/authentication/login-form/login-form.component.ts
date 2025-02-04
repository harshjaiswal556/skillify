// import { Component } from '@angular/core';
// import { Login } from './login-form.interface';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { LoginService } from '../../../services/auth/login.service';
// import { Router } from '@angular/router';

// import { Store } from '@ngrx/store';
// import { AuthState } from '../../../store/reducer/auth.reducer';
// import { login } from '../../../store/action/auth.action';
// import { selectUser } from '../../../store/selector/auth.selector';

// @Component({
//   selector: 'app-login-form',
//   standalone: false,
  
//   templateUrl: './login-form.component.html',
//   styleUrl: './login-form.component.css'
// })
// export class LoginFormComponent {
//   loginForm!: FormGroup;
//   constructor(private fb : FormBuilder, private loginService : LoginService, private router : Router){
//     this.save()
//   }
  
//   userId : string = '';

//   save(){
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     })
//   }

//   loginSubmit(){
//     if (this.loginForm.valid) {
//       const formValue = this.loginForm.value as Login; 
//       this.loginService.getUser(formValue.email, formValue.password).subscribe(res => {
//         // console.log(res);
//         this.userId = res.id;
//         if(res.role === "faculty"){
//           this.router.navigate(['faculty-dashboard'])
//         }else if(res.role === "student"){
//           this.router.navigate(['student-dashboard'])
//         }else{
//           this.router.navigate(['admin-dashboard'])
//         }
//       })
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/reducer/auth.reducer';
import { login } from '../../../store/action/auth.action';
import { selectUser } from '../../../store/selector/auth.selector';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm!: FormGroup;

  
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
      
      // Dispatch login action

      this.store.dispatch(login({ email, password }));

      // Listen to user state and navigate accordingly
      this.store.select('auth').pipe().subscribe(user => {
      // this.store.select('auth').pipe(take(1)).subscribe(user => {
      console.log(user);
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
