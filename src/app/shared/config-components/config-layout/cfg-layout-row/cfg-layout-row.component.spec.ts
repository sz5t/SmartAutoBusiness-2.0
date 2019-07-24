import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgLayoutRowComponent } from './cfg-layout-row.component';

describe('CfgLayoutRowComponent', () => {
  let component: CfgLayoutRowComponent;
  let fixture: ComponentFixture<CfgLayoutRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgLayoutRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgLayoutRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
