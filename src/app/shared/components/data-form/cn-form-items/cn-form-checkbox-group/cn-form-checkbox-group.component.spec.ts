import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormCheckboxGroupComponent } from './cn-form-checkbox-group.component';

describe('CnFormCheckboxGroupComponent', () => {
  let component: CnFormCheckboxGroupComponent;
  let fixture: ComponentFixture<CnFormCheckboxGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormCheckboxGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
