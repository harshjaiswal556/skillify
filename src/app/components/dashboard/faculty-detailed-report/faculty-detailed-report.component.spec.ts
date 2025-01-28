import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDetailedReportComponent } from './faculty-detailed-report.component';

describe('FacultyDetailedReportComponent', () => {
  let component: FacultyDetailedReportComponent;
  let fixture: ComponentFixture<FacultyDetailedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyDetailedReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
