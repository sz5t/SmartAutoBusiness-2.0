import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormMonthPickerComponent } from './cn-form-month-picker.component';

describe('CnFormMonthPickerComponent', () => {
  let component: CnFormMonthPickerComponent;
  let fixture: ComponentFixture<CnFormMonthPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormMonthPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
