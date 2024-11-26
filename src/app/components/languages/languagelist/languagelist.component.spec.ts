import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagelistComponent } from './languagelist.component';

describe('LanguagelistComponent', () => {
  let component: LanguagelistComponent;
  let fixture: ComponentFixture<LanguagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
