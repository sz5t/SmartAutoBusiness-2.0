import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridYearPickerComponent } from './cn-grid-year-picker.component';

describe('CnGridYearPickerComponent', () => {
  let component: CnGridYearPickerComponent;
  let fixture: ComponentFixture<CnGridYearPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridYearPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridYearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
