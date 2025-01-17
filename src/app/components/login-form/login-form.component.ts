import { Component } from '@angular/core';
import { Login } from './login-form.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: false,
  
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  constructor(private fb : FormBuilder){
    this.save()
  }
  
  save(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginSubmit(){
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value as Login; 
      console.log(formValue);
    }
  }
}
