import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlacementsComponent } from './active-placements.component';

describe('ActivePlacementsComponent', () => {
  let component: ActivePlacementsComponent;
  let fixture: ComponentFixture<ActivePlacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePlacementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
