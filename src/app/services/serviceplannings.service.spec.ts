import { TestBed } from '@angular/core/testing';

import { ServicePlanningsService } from './serviceplannings.service';

describe('ServiceplanningsService', () => {
  let service: ServicePlanningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePlanningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
