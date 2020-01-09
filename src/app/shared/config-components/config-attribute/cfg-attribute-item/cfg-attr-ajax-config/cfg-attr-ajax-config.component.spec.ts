import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttrAjaxConfigComponent } from './cfg-attr-ajax-config.component';

describe('CfgAttrAjaxConfigComponent', () => {
  let component: CfgAttrAjaxConfigComponent;
  let fixture: ComponentFixture<CfgAttrAjaxConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttrAjaxConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttrAjaxConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
