import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridMonthPickerComponent } from './cn-grid-month-picker.component';

describe('CnGridMonthPickerComponent', () => {
  let component: CnGridMonthPickerComponent;
  let fixture: ComponentFixture<CnGridMonthPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridMonthPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
