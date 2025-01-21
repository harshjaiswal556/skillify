import { Component } from '@angular/core';
import { SignUp } from './sign-up-form.interface';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  standalone: false,
  
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  signUpForm!: FormGroup;
  constructor(private fb : FormBuilder){
    this.save()
  }
  
  save(){
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signUpSubmit(){
    if(this.signUpForm.valid){
      const formValue = this.signUpForm.value as SignUp
      console.log(formValue);
    }
  }
}
