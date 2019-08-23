import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormCheckboxComponent } from './cn-form-checkbox.component';

describe('CnFormCheckboxComponent', () => {
  let component: CnFormCheckboxComponent;
  let fixture: ComponentFixture<CnFormCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
