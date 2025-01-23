import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course-form',
  standalone: false,
  
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.css'
})
export class AddCourseFormComponent {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService : CourseService){
    this.save()
  }

  imgValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File;
      console.log(file);
      
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return allowedTypes.includes(file.type) ? null : { invalidFileType: true };
      }
      return null;
    };
  }

  save(){
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
      description: ['', Validators.required],
      tag: 'web'
    })
  }

  courseSubmit(){
    if(this.courseForm.valid){
      const formValue = this.courseForm.value
      this.courseService.addCourses(formValue).subscribe(res => {
        console.log(res);
        alert("Course added successfully!!!");
        this.courseForm.reset();
      })
    }
  }
}
