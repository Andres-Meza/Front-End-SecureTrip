import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPlanningListComponent } from './travel-planning-list.component';

describe('TravelPlanningListComponent', () => {
  let component: TravelPlanningListComponent;
  let fixture: ComponentFixture<TravelPlanningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPlanningListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPlanningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
