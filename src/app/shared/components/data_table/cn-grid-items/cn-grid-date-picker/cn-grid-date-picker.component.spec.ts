import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridDatePickerComponent } from './cn-grid-date-picker.component';

describe('CnGridDatePickerComponent', () => {
  let component: CnGridDatePickerComponent;
  let fixture: ComponentFixture<CnGridDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
