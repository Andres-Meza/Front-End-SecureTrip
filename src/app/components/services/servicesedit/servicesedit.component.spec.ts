import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceseditComponent } from './servicesedit.component';

describe('ServiceseditComponent', () => {
  let component: ServiceseditComponent;
  let fixture: ComponentFixture<ServiceseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceseditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
