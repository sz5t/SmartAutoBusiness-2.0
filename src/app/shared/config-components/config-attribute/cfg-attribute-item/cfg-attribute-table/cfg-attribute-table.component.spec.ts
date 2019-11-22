import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeTableComponent } from './cfg-attribute-table.component';

describe('CfgAttributeTableComponent', () => {
  let component: CfgAttributeTableComponent;
  let fixture: ComponentFixture<CfgAttributeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
