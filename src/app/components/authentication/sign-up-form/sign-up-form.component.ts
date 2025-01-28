import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SignUp } from './sign-up-form.interface';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignUpService } from '../../../services/auth/sign-up.service';

@Component({
  selector: 'app-sign-up-form',
  standalone: false,
  
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent implements OnChanges {
  @Input() role : string = '';
  signUpForm!: FormGroup;

  constructor(private fb : FormBuilder, private signUpService : SignUpService){
    this.save();
  }
  
  private save(){
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
      role: [this.role, Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['role'] && !changes['role'].firstChange) {
      this.signUpForm.patchValue({ role: this.role });
      console.log(`Role updated to: ${this.role}`);
    }
  }

  signUpSubmit(){
    if(this.signUpForm.valid){
      const password = this.signUpForm.get('password')?.value;
      const cPassword = this.signUpForm.get('cPassword')?.value;
      if(password === cPassword){
        const formValue = this.signUpForm.value as SignUp      
        this.signUpService.createUser(formValue).subscribe(res => {
          alert("Thankyou for joining skillify");
          this.signUpForm.reset();
        })
      }else{
        alert("Password doesn't match")
      }
    }
  }
}
