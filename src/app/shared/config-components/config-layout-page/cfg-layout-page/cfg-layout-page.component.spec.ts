import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutPageComponent } from './cfg-layout-page.component';

describe('CfgLayoutPageComponent', () => {
  let component: CfgLayoutPageComponent;
  let fixture: ComponentFixture<CfgLayoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
