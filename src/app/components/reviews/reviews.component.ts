import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { Reviews } from './reviews.interface';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: false,
  
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  testimonials!: Reviews[];

  private _albums: Array<{ src: string; caption: string; thumb: string }> = [];
  constructor(private _lightbox: Lightbox, private reviewService: ReviewsService) {
    
    this.reviewService.getReviews().subscribe(res=>{
      this.testimonials = res;
      
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

      this.groupTestimonials();

    })
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  // testimonials: any[]=

  groupedTestimonials: any[] = [];

  groupTestimonials(): void {
    const groupSize = 3; 
    for (let i = 0; i < this.testimonials.length; i += groupSize) {
      this.groupedTestimonials.push(this.testimonials.slice(i, i + groupSize));
    }
  }

}
