import { Component } from '@angular/core';
import { Login } from './login-form.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: false,
  
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  constructor(private fb : FormBuilder, private loginService : LoginService, private router : Router){
    this.save()
  }
  
  userId : string = '';

  save(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginSubmit(){
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value as Login; 
      this.loginService.getUser(formValue.email, formValue.password).subscribe(res => {
        // console.log(res);
        this.userId = res.id;
        if(res.role === "faculty"){
          this.router.navigate(['faculty-dashboard'])
        }else if(res.role === "student"){
          this.router.navigate(['student-dashboard'])
        }else{
          this.router.navigate(['admin-dashboard'])
        }
      })
    }
  }
}
