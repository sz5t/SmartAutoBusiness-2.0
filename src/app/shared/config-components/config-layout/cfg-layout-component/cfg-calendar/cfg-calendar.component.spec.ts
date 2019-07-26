import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgCalendarComponent } from './cfg-calendar.component';

describe('CfgCalendarComponent', () => {
  let component: CfgCalendarComponent;
  let fixture: ComponentFixture<CfgCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
