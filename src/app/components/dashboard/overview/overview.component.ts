import { Component } from '@angular/core';
import { FacultyReportService } from '../../../services/faculty/faculty-report.service';
import { CourseService } from '../../../services/course.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/reducer/auth.reducer';
import { Observable } from 'rxjs';
import { SecureStorageService } from '../../../services/auth/secure-storage.service';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

  userData: any[] = [];
  deactivatedCourseCount: number = 0;
  count$: Observable<any> | undefined;

  constructor(
    private user: FacultyReportService,
    private courseService: CourseService,
    private store: Store<{ auth: AuthState }>,
    private secureStorage: SecureStorageService
  ) {
    const userData = JSON.parse(secureStorage.getItem('encrypt'));
    if (userData) {
      this.user.getData(userData.id).subscribe(res => {
        this.userData = res;
        debugger
        this.fetchDeactivatedCourses();
      });
    }
  }
  
  ngOnInit() {
    this.store.select('auth').pipe().subscribe(authUser => {
      if (authUser) {
        this.user.getData(authUser.user.id).subscribe(res => {
          this.userData = res;
        });
      }
    });
  }

  fetchDeactivatedCourses() {
    this.deactivatedCourseCount = 0;
    const user = JSON.parse(this.secureStorage.getItem('encrypt'));
    if (user && this.userData.length > 0 && this.userData[0].course) {
      const userRole = user.role;
      if (userRole === 'student') {
        const courseIds = this.userData[0].course.map((c: { courseId: any; }) => c.courseId);
        courseIds.forEach((courseId: string) => {
          this.courseService.getCoursesById(courseId).subscribe(courseData => {
            if (courseData && courseData.length > 0 && courseData[0].isDeactivate) {
              this.deactivatedCourseCount++;
            }
          });
        });
      } else if (userRole === 'faculty') {
        const courseIds = this.userData[0].course; 
        courseIds.forEach((courseId: string) => {
          this.courseService.getCoursesById(courseId).subscribe(courseData => {
            if (courseData && courseData.length > 0 && courseData[0].isDeactivate) {
              this.deactivatedCourseCount++;
            }
          });
        });
      }
    }
  }
}
