import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SignUp } from './sign-up-form.interface';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignUpService } from '../../../services/auth/sign-up.service';

import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-sign-up-form',
  standalone: false,
  
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent implements OnChanges {
  @Input() role : string = '';
  signUpForm!: FormGroup;

  otpNumber : number = Math.floor(Math.random()*(99999-10001 + 1) + 10001);

  constructor(private fb : FormBuilder, private signUpService : SignUpService){
    this.save();
  }
  
  private save(){
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      // user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
      role: [this.role, Validators.required],
      message : ['']
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['role'] && !changes['role'].firstChange) {
      this.signUpForm.patchValue({ role: this.role });
      console.log(`Role updated to: ${this.role}`);
    }
  }

  otp(e : Event){
    e.preventDefault();
    const templateParams = {
      user: this.signUpForm.get('user')?.value,  
      name: this.signUpForm.get('name')?.value,  
      message: this.otpNumber.toString(),  
    };

    emailjs
    .send('service_li70tn6', 'template_xaeme4r', templateParams, 'twow_OiDcodzo3LCz')                                                                
      // .sendForm('service_li70tn6', 'template_xaeme4r', e.target as HTMLFormElement, {
      //   publicKey: 'twow_OiDcodzo3LCz',                                                        
      // })                                                                
      .then(
        () => {
          alert("Email sent successfully")
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
    
  }

  signUpSubmit(e : Event){
    console.log("Hello");
    
    if(this.signUpForm.valid){
      const password = this.signUpForm.get('password')?.value;
      const cPassword = this.signUpForm.get('cPassword')?.value;
      if(password === cPassword){
        if (this.role || this.otpNumber === parseInt(this.signUpForm.get('message')?.value)) {
          console.log("Noicceee");
          const formValue = this.signUpForm.value as SignUp      
          this.signUpService.createUser(formValue).subscribe(res => {
            alert("Thankyou for joining skillify");
            this.signUpForm.reset();
          })
        }else{
          alert("OTP is incorrect")
        }
      }else{
        alert("Password doesn't match")
      }
    }
  }
}
