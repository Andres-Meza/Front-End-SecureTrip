import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportserviceeditComponent } from './transportserviceedit.component';

describe('TransportserviceeditComponent', () => {
  let component: TransportserviceeditComponent;
  let fixture: ComponentFixture<TransportserviceeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportserviceeditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportserviceeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
