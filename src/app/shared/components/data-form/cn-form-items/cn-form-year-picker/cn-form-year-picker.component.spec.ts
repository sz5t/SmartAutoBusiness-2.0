import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormYearPickerComponent } from './cn-form-year-picker.component';

describe('CnFormYearPickerComponent', () => {
  let component: CnFormYearPickerComponent;
  let fixture: ComponentFixture<CnFormYearPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormYearPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormYearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
