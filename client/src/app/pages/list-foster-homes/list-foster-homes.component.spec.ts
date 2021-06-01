import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFosterHomesComponent } from './list-foster-homes.component';

describe('ListFosterHomesComponent', () => {
  let component: ListFosterHomesComponent;
  let fixture: ComponentFixture<ListFosterHomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFosterHomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFosterHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
