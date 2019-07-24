import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgFormItemComponent } from './cfg-form-item.component';

describe('CfgFormItemComponent', () => {
  let component: CfgFormItemComponent;
  let fixture: ComponentFixture<CfgFormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgFormItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
