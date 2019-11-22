import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeTableFormComponent } from './cfg-attribute-table-form.component';

describe('CfgAttributeTableFormComponent', () => {
  let component: CfgAttributeTableFormComponent;
  let fixture: ComponentFixture<CfgAttributeTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
