import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratoreditComponent } from './collaboratoredit.component';

describe('CollaboratoreditComponent', () => {
  let component: CollaboratoreditComponent;
  let fixture: ComponentFixture<CollaboratoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratoreditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
