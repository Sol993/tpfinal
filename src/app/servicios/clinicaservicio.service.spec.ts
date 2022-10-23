import { TestBed } from '@angular/core/testing';

import { ClinicaservicioService } from './clinicaservicio.service';

describe('ClinicaservicioService', () => {
  let service: ClinicaservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicaservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
