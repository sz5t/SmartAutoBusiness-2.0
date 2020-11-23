import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormInputPasswordComponent } from './cn-form-input-password.component';

describe('CnFormInputPasswordComponent', () => {
  let component: CnFormInputPasswordComponent;
  let fixture: ComponentFixture<CnFormInputPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormInputPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
