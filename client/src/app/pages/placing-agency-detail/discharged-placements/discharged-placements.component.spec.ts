import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargedPlacementsComponent } from './discharged-placements.component';

describe('DischargedPlacementsComponent', () => {
  let component: DischargedPlacementsComponent;
  let fixture: ComponentFixture<DischargedPlacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DischargedPlacementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargedPlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
