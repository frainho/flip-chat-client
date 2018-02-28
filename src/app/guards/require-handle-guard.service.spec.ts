import { TestBed, inject } from '@angular/core/testing';

import { RequireHandleGuardService } from './require-handle-guard.service';

describe('RequireHandleGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireHandleGuardService]
    });
  });

  it('should be created', inject([RequireHandleGuardService], (service: RequireHandleGuardService) => {
    expect(service).toBeTruthy();
  }));
});
