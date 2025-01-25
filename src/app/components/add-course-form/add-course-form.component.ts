import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { SignUpService } from '../../services/auth/sign-up.service';

@Component({
  selector: 'app-add-course-form',
  standalone: false,

  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.css'
})
export class AddCourseFormComponent {
  courseForm!: FormGroup;

  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() id: string = '';
  @Input() userId: string = '';

  updateCourse: boolean = false;

  constructor(private fb: FormBuilder, private courseService: CourseService, private userService: SignUpService) {
    this.save();
    console.log(this.title);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'] || changes['price'] || changes['description']) {
      this.courseForm.patchValue({
        title: this.title,
        price: this.price,
        description: this.description,
        id: this.id,
      });
      this.updateCourse = true
    }
  }

  save() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.courseForm = this.fb.group({
      title: [this.title, Validators.required],
      price: [this.price, Validators.required],
      image: [''],
      description: [this.description, Validators.required],
      date: `${day}-${month}-${year}`,
    })
  }

  courseSubmit() {
    if (this.courseForm.valid) {
      const formValue = this.courseForm.value
      console.log(formValue);
      console.log(this.userId);
      
      if (this.updateCourse) {
        this.courseService.updateCourseById(this.id, formValue).subscribe(res => {
          // this.userService.addCourseToUser()
          alert("Course updated successfully!!!");
          this.courseForm.reset();
        })

      } else {
        this.courseService.addCourses(formValue).subscribe(res => {
          console.log(res);
          this.userService.addCourseToUser(this.userId, res.id).subscribe(res=>{
            alert("Course added successfully!!!");
            this.courseForm.reset();
          })
        })
      }
    }

  }
}
