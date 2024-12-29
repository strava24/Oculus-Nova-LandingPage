import { TestBed } from '@angular/core/testing';

import { ScreenCalibrationService } from './screen-calibration.service';

describe('ScreenCalibrationService', () => {
  let service: ScreenCalibrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenCalibrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
