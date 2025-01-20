import { Component } from '@angular/core';

@Component({
  selector: 'app-all-courses',
  standalone: false,
  
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {
  value: string = '';
  isFocused: boolean = false;
}
