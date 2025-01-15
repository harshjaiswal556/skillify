import { Component } from '@angular/core';

@Component({
  selector: 'app-instructors',
  standalone: false,
  
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.css'
})
export class InstructorsComponent {
  instructors: any[] = [
    {
      "name": "Harsh",
      "teaching": "Java",
      "experience": "8",
      "rating": 4
    },
    {
      "name": "Rohan",
      "teaching": "Python",
      "experience": "9",
      "rating": 3
    },
    {
      "name": "Lina",
      "teaching": "Angular",
      "experience": "12",
      "rating": 5
    },
    {
      "name": "Hitesh",
      "teaching": "React",
      "experience": "4",
      "rating": 4
    }
  ]

  Array = Array;
}
