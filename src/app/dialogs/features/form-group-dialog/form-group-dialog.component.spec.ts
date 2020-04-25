import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupDialogComponent } from './form-group-dialog.component';

describe('FormGroupDialogComponent', () => {
  let component: FormGroupDialogComponent;
  let fixture: ComponentFixture<FormGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
