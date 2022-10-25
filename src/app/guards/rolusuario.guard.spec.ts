import { TestBed } from '@angular/core/testing';

import { RolusuarioGuard } from './rolusuario.guard';

describe('RolusuarioGuard', () => {
  let guard: RolusuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolusuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
