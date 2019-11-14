import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridWeekPickerComponent } from './cn-grid-week-picker.component';

describe('CnGridWeekPickerComponent', () => {
  let component: CnGridWeekPickerComponent;
  let fixture: ComponentFixture<CnGridWeekPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridWeekPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridWeekPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
