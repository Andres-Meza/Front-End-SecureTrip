import { TestBed } from '@angular/core/testing';

import { TransportServicesService } from './transportservices.service';

describe('TransportservicesService', () => {
  let service: TransportServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
