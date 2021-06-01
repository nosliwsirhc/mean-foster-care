import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFosterHomeComponent } from './create-foster-home.component';

describe('CreateFosterHomeComponent', () => {
  let component: CreateFosterHomeComponent;
  let fixture: ComponentFixture<CreateFosterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFosterHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFosterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
