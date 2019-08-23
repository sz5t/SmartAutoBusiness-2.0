import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormRadioComponent } from './cn-form-radio.component';

describe('CnFormRadioComponent', () => {
  let component: CnFormRadioComponent;
  let fixture: ComponentFixture<CnFormRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
