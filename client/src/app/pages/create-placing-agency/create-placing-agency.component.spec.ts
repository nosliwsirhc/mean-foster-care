import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlacingAgencyComponent } from './create-placing-agency.component';

describe('CreatePlacingAgencyComponent', () => {
  let component: CreatePlacingAgencyComponent;
  let fixture: ComponentFixture<CreatePlacingAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlacingAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlacingAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
