import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailedReportComponent } from './admin-detailed-report.component';

describe('AdminDetailedReportComponent', () => {
  let component: AdminDetailedReportComponent;
  let fixture: ComponentFixture<AdminDetailedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDetailedReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
