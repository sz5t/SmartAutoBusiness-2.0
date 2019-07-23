import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutTabsComponent } from './cfg-layout-tabs.component';

describe('CfgLayoutTabsComponent', () => {
  let component: CfgLayoutTabsComponent;
  let fixture: ComponentFixture<CfgLayoutTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
