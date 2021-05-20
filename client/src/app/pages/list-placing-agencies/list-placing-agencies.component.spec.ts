import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlacingAgenciesComponent } from './list-placing-agencies.component';

describe('ListPlacingAgenciesComponent', () => {
  let component: ListPlacingAgenciesComponent;
  let fixture: ComponentFixture<ListPlacingAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlacingAgenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlacingAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
