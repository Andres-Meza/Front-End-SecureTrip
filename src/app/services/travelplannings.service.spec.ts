import { TestBed } from '@angular/core/testing';

import { TravelplanningsService } from './travelplannings.service';

describe('TravelplanningsService', () => {
  let service: TravelplanningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelplanningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
