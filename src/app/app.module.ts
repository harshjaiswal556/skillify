import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.router';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { InstructorsComponent } from './pages/instructors/instructors.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CourseComponent } from './components/course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    InstructorsComponent,
    ReviewsComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ContactFormComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LightboxModule,
    routes,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
