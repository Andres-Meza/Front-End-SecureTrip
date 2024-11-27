import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportServicesComponent } from './transport-services.component';

describe('TransportServicesComponent', () => {
  let component: TransportServicesComponent;
  let fixture: ComponentFixture<TransportServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
