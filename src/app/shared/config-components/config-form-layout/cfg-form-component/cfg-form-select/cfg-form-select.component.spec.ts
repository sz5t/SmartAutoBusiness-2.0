import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgFormSelectComponent } from './cfg-form-select.component';

describe('CfgFormSelectComponent', () => {
  let component: CfgFormSelectComponent;
  let fixture: ComponentFixture<CfgFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
