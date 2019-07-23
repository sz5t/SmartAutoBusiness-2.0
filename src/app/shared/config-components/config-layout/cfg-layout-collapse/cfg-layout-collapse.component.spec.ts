import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutCollapseComponent } from './cfg-layout-collapse.component';

describe('CfgLayoutCollapseComponent', () => {
  let component: CfgLayoutCollapseComponent;
  let fixture: ComponentFixture<CfgLayoutCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
