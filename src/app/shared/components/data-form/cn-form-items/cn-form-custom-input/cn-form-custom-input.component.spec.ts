import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormCustomInputComponent } from './cn-form-custom-input.component';

describe('CnFormCustomInputComponent', () => {
  let component: CnFormCustomInputComponent;
  let fixture: ComponentFixture<CnFormCustomInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormCustomInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormCustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
