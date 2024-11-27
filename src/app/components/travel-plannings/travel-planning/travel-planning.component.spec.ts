import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPlanningComponent } from './travel-planning.component';

describe('TravelPlanningComponent', () => {
  let component: TravelPlanningComponent;
  let fixture: ComponentFixture<TravelPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
