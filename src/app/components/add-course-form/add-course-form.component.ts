import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course-form',
  standalone: false,
  
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.css'
})
export class AddCourseFormComponent {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder){
    this.save()
  }

  save(){
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  courseSubmit(){
    if(this.courseForm.valid){
      const formValue = this.courseForm.value
      console.log(formValue);
    }
  }
}
