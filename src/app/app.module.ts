import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

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
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import { FaqComponent } from './pages/faq/faq.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AllCoursesComponent } from './pages/all-courses/all-courses.component';
import { StudentComponent } from './pages/dashboard/student/student.component';
import { OverviewComponent } from './components/overview/overview.component';
import { DetailedReportComponent } from './components/detailed-report/detailed-report.component';

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
    CourseComponent,
    SignUpComponent,
    SignUpFormComponent,
    LoginComponent,
    LoginFormComponent,
    AddCourseFormComponent,
    FaqComponent,
    AllCoursesComponent,
    StudentComponent,
    OverviewComponent,
    DetailedReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LightboxModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
