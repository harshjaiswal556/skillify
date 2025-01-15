import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-reviews',
  standalone: false,
  
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  private _albums: Array<{ src: string; caption: string; thumb: string }> = [];
  constructor(private _lightbox: Lightbox) {
    
    for (let i = 0; i < this.testimonials.length; i++) {
      
      const src = this.testimonials[i]['image'];
      
      const caption = this.testimonials[i]['name'];
      const thumb = 'assets/image/' + i + '-thumb.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._albums.push(album);
    }
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  testimonials: any[]=[
    {
      "name":"Steven Jhonsan",
      "image":"assets/testimonials/steven.jpeg",
      "review":"Skillify transformed the way I learn. The tailored courses and flexible scheduling made it so easy to pick up new skills while balancing my studies. Highly recommended!",
      "bgColor":"#9d789b"
    },
    {
      "name":"Shubh Gupta",
      "image":"assets/testimonials/shubh.jpeg",
      "review":"As an educator, Skillify has given me the perfect platform to share my knowledge and connect with students passionate about learning. The interface is intuitive, and the scheduling tools are a lifesaver!",
      "bgColor":"#7a81a8"
    },
    {
      "name":"Ananya Roy",
      "image":"assets/testimonials/ananya.jpeg",
      "review":"Thanks to Skillify, I could learn at my own pace and get guidance from top-notch teachers. The platform is user-friendly, and the support is fantastic!",
      "bgColor":"#6d5b98"
    },
    {
      "name":"Virat Singh",
      "image":"assets/testimonials/virat.jpeg",
      "review":"I enrolled in a coding course through Skillify, and it was the best decision I made. The ability to choose my teacher and time slot made the experience so personalized.",
      "bgColor":"#5b7498"
    },
    {
      "name":"Ritesh Mittal",
      "image":"assets/testimonials/ritesh.jpeg",
      "review":"I've been using Skillify for a few months, and I've seen such a positive change in my skills and confidence. The courses are engaging, and the teachers are excellent!",
      "bgColor":"#985b65"
    }
  ]

  groupedTestimonials: any[] = [];

  ngOnInit(): void {
    this.groupTestimonials();
  }

  groupTestimonials(): void {
    const groupSize = 3; 
    for (let i = 0; i < this.testimonials.length; i += groupSize) {
      this.groupedTestimonials.push(this.testimonials.slice(i, i + groupSize));
    }
  }

}
