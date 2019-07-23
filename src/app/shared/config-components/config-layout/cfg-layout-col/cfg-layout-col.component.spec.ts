import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutColComponent } from './cfg-layout-col.component';

describe('CfgLayoutColComponent', () => {
  let component: CfgLayoutColComponent;
  let fixture: ComponentFixture<CfgLayoutColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
