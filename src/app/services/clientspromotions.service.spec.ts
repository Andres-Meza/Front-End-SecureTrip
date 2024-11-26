import { TestBed } from '@angular/core/testing';

import { ClientsPromotionsService } from './clientspromotions.service';

describe('ClientspromotionsService', () => {
  let service: ClientsPromotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsPromotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
