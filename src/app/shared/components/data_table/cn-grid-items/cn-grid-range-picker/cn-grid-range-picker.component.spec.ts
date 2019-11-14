import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridRangePickerComponent } from './cn-grid-range-picker.component';

describe('CnGridRangePickerComponent', () => {
  let component: CnGridRangePickerComponent;
  let fixture: ComponentFixture<CnGridRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridRangePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
