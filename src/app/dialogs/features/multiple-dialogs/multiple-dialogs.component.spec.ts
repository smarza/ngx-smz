import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDialogsComponent } from './multiple-dialogs.component';

describe('MultipleDialogsComponent', () => {
  let component: MultipleDialogsComponent;
  let fixture: ComponentFixture<MultipleDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
