import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutCardComponent } from './cfg-layout-card.component';

describe('CfgLayoutCardComponent', () => {
  let component: CfgLayoutCardComponent;
  let fixture: ComponentFixture<CfgLayoutCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
