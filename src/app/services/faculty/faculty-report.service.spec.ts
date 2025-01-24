import { TestBed } from '@angular/core/testing';

import { FacultyReportService } from './faculty-report.service';

describe('FacultyReportService', () => {
  let service: FacultyReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
