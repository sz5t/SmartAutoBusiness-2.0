import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnReportGridComponent } from './cn-report-grid.component';

describe('CnReportGridComponent', () => {
  let component: CnReportGridComponent;
  let fixture: ComponentFixture<CnReportGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnReportGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnReportGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
