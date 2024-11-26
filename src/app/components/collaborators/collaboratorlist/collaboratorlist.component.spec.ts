import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorlistComponent } from './collaboratorlist.component';

describe('CollaboratorlistComponent', () => {
  let component: CollaboratorlistComponent;
  let fixture: ComponentFixture<CollaboratorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
