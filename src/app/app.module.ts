import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { HttpClientModule } from '@angular/common/http';

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
import { SignUpFormComponent } from './components/authentication/sign-up-form/sign-up-form.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import { FaqComponent } from './pages/faq/faq.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AllCoursesComponent } from './pages/all-courses/all-courses.component';
import { StudentComponent } from './pages/dashboard/student/student.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { DetailedReportComponent } from './components/dashboard/detailed-report/detailed-report.component';
import { FacultyComponent } from './pages/dashboard/faculty/faculty.component';
import { FacultyDetailedReportComponent } from './components/dashboard/faculty-detailed-report/faculty-detailed-report.component';
import { AdminComponent } from './pages/dashboard/admin/admin.component';
import { AdminOverviewComponent } from './components/dashboard/admin-overview/admin-overview.component';
import { AdminDetailedReportComponent } from './components/dashboard/admin-detailed-report/admin-detailed-report.component';
import { AllFacultyComponent } from './components/dashboard/all-faculty/all-faculty.component';
import { AllStudentComponent } from './components/dashboard/all-student/all-student.component';

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
    DetailedReportComponent,
    FacultyComponent,
    FacultyDetailedReportComponent,
    AdminComponent,
    AdminOverviewComponent,
    AdminDetailedReportComponent,
    AllFacultyComponent,
    AllStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LightboxModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
