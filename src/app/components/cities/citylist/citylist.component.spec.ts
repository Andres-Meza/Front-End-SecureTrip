import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitylistComponent } from './citylist.component';

describe('CitylistComponent', () => {
  let component: CitylistComponent;
  let fixture: ComponentFixture<CitylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
