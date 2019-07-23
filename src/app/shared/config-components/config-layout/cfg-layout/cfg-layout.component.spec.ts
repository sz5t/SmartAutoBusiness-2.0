import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutComponent } from './cfg-layout.component';

describe('CfgLayoutComponent', () => {
  let component: CfgLayoutComponent;
  let fixture: ComponentFixture<CfgLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
