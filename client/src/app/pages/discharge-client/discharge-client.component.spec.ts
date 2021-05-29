import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeClientComponent } from './discharge-client.component';

describe('DischargeClientComponent', () => {
  let component: DischargeClientComponent;
  let fixture: ComponentFixture<DischargeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DischargeClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
