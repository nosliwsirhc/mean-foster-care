import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacingAgencyDetailComponent } from './placing-agency-detail.component';

describe('PlacingAgencyDetailComponent', () => {
  let component: PlacingAgencyDetailComponent;
  let fixture: ComponentFixture<PlacingAgencyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacingAgencyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacingAgencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
