import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttrCascadeComponent } from './cfg-attr-cascade.component';

describe('CfgAttrCascadeComponent', () => {
  let component: CfgAttrCascadeComponent;
  let fixture: ComponentFixture<CfgAttrCascadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttrCascadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttrCascadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
