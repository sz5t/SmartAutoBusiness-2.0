import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgFromLayoutRowComponent } from './cfg-form-layout-row.component';

describe('CfgFromLayoutRowComponent', () => {
  let component: CfgFromLayoutRowComponent;
  let fixture: ComponentFixture<CfgFromLayoutRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgFromLayoutRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgFromLayoutRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
