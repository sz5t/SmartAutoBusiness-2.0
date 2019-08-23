import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormWeekPickerComponent } from './cn-form-week-picker.component';

describe('CnFormWeekPickerComponent', () => {
  let component: CnFormWeekPickerComponent;
  let fixture: ComponentFixture<CnFormWeekPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormWeekPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormWeekPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
