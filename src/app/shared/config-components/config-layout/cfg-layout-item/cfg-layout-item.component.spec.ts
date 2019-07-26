import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutItemComponent } from './cfg-layout-item.component';

describe('CfgLayoutItemComponent', () => {
  let component: CfgLayoutItemComponent;
  let fixture: ComponentFixture<CfgLayoutItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
