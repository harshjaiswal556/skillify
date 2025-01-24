import { Component } from '@angular/core';

@Component({
  selector: 'app-all-courses',
  standalone: false,
  
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {
  searchValue: string = '';
  isFocused: boolean = false;

  onSearch(value: string): void {
    this.searchValue = value;
  }
}
