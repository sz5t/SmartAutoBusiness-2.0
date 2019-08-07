import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormInputComponent } from './cn-form-input.component';

describe('CnFormInputComponent', () => {
  let component: CnFormInputComponent;
  let fixture: ComponentFixture<CnFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
