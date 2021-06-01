import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosterHomeDetailComponent } from './foster-home-detail.component';

describe('FosterHomeDetailComponent', () => {
  let component: FosterHomeDetailComponent;
  let fixture: ComponentFixture<FosterHomeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosterHomeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FosterHomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
