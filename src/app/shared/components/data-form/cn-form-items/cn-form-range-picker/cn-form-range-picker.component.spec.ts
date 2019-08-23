import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormRangePickerComponent } from './cn-form-range-picker.component';

describe('CnFormRangePickerComponent', () => {
  let component: CnFormRangePickerComponent;
  let fixture: ComponentFixture<CnFormRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormRangePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
