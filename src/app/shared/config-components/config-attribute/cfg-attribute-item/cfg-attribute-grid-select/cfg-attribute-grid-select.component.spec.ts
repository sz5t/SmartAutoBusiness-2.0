import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeGridSelectComponent } from './cfg-attribute-grid-select.component';

describe('CfgAttributeGridSelectComponent', () => {
  let component: CfgAttributeGridSelectComponent;
  let fixture: ComponentFixture<CfgAttributeGridSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeGridSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
