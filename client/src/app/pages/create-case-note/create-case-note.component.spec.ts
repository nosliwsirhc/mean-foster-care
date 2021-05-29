import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseNoteComponent } from './create-case-note.component';

describe('CreateCaseNoteComponent', () => {
  let component: CreateCaseNoteComponent;
  let fixture: ComponentFixture<CreateCaseNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCaseNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
