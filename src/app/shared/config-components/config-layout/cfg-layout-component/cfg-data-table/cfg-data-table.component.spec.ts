import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgDataTableComponent } from './cfg-data-table.component';

describe('CfgDataTableComponent', () => {
  let component: CfgDataTableComponent;
  let fixture: ComponentFixture<CfgDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
