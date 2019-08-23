import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormDatePickerComponent } from './cn-form-date-picker.component';

describe('CnFormDatePickerComponent', () => {
  let component: CnFormDatePickerComponent;
  let fixture: ComponentFixture<CnFormDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
